---
title: "The UPS, the phantom interface and NUT"
date: 2025-09-10
description: "The saga of getting the communication interface for a TS Shara UPS bought online, and how to set it up with NUT."
assuntos: ["Homelab", "Equipment", "Guides"]
---
When I reorganized my homelab this year, I decided it was time for a proper UPS: pure sine wave, rack-mount and able to talk to the servers, so they could shut themselves down during an extended power outage. I picked a [TS Shara rack-mount sine wave UPS](https://tsshara.com.br/produto/nobreak-ups-rack-senoidal-universal-1200va-2bs-7ah/) (2U, 1200 VA), bought on Mercado Livre (Latin America's largest online marketplace) at the end of March. The product page had the clincher right there: "Comunicação inteligente sob demanda USB, RS-232 e SNMP" (smart communication on demand: USB, RS-232 and SNMP).

*If you'd rather skip the story, [jump straight to the technical part](#the-architecture).*

## The phantom interface

{{< figura img="img/notas/ts-shara-1200va-pagina.png" ampliar="true" alt="Screenshot of the UPS Rack Senoidal Universal 1200VA product page on the TS Shara website, with the feature Comunicação inteligente sob demanda USB, RS-232 e SNMP (smart communication on demand: USB, RS-232 and SNMP) highlighted" legenda="Excerpts from the model's page on the TS Shara website, September 29, 2026 (highlighting mine)." >}}

What the page doesn't explain is what that "sob demanda" (on demand) actually means. All signs point to "factory option, made to order": the [product line manual](https://tsshara.com.br/wp-content/uploads/2021/12/Nobreak-UPS-Rack-para-Site.pdf) uses the same expression for the circuit breaker ("Circuit Breaker sob demanda") and, in the communication section, mentions a "USB ou RS-232 (sob demanda)" connector, with the cable bought separately and the Power NT management software. I only found out what this means in practice after the unit arrived, in a reply from the manufacturer itself to a comment on the [product line's launch video](https://www.youtube.com/watch?v=dX3LxBBmAPk), where someone had asked exactly that: "Significa que o nobreak se for comprado em uma revenda, não possui de série essa comunicação." (It means that if the UPS is bought from a reseller, it doesn't come with this communication as standard.)

{{< figura img="img/notas/ts-shara-comentario.png" ampliar="true" alt="Screenshot of a YouTube comment: someone asks what sob demanda means, and TS Shara replies that a UPS bought from a reseller doesn't come with communication as standard, that it has to be sent to a service center to have it installed, and that it can be ordered with factory-installed communication through the sales department" legenda="TS Shara's reply on the launch video, screenshot from September 2026 (commenter's name omitted)." >}}

In other words, if you've already bought one, you have to send the UPS to a service center to have the interface installed; if you haven't bought yet, you can order it with factory-installed communication through the sales department. In my case, only the first path was left. The day after delivery, following a phone call, customer service told me to take the UPS to an authorized service center in Brasília and promised to ship the USB module free of charge. That's when the wait began. The service center couldn't get an answer from the factory, and the part never showed up.

In May, the explanation was a problem with Correios (Brazil's national postal service), along with a promise to resend it by Sedex (their express service) the next day. In July, after almost 100 days of waiting without being able to use the equipment as planned, I filed a complaint on Reclame AQUI (Brazil's best-known consumer complaint site) and followed up through the contact form on the manufacturer's website. Only then did things start moving: the manufacturer contacted me to apologize, replied to the complaint on the site and, at last, sent the module to the service center. Installation and handover were quick.

If you plan to buy one of these online, now you know the drill. From the very first contact, I could tell this wasn't a routine procedure, and it almost felt like they were doing me a favor.

## Unorthodox mounting

The mounting wouldn't even be worth mentioning if it weren't for one detail: I don't have a rack, and I don't plan to get one. I bought this model because I don't like the monstrosities sold to the average consumer: they remind me of the voltage stabilizers Brazilians used to plug their computers into, only bigger, heavier and uglier. I tried mounting it under the big shelf I use as a desk, with a microwave bracket, and it went very, very wrong. No combination of wall anchors and screws could keep the UPS from sagging forward, there was no way to secure it properly, and it was hell to work with. In one of those moments that make you question your life choices, the thing toppled over and ended up on the floor. But it survived, and now it sits on top of the big shelf, which hasn't sagged enough to worry me yet (but I'm keeping an eye on it).

## On the other end of the cable

With the module installed, the UPS's USB port shows up in Linux as an STMicroelectronics virtual serial port (`0483:5740`, "Virtual COM Port") that speaks the Megatec/Q1 protocol. In [NUT (Network UPS Tools)](https://networkupstools.org/), that means using the `blazer_ser` driver (`nutdrv_qx` with `protocol = megatec` is the alternative). My starting point was the [ups-nut-tsshara](https://github.com/mrmodolo/ups-nut-tsshara) repository, which documents a sibling model from the same line.

Two practical lessons:

- **Give the port a fixed name.** The device may show up as `/dev/ttyACM0` today and `/dev/ttyACM1` tomorrow. A udev rule based on vendor, product and serial number creates a stable link (`/dev/ttyTSSHARA0`).
- **Don't trust the charge percentage or the estimated runtime.** On this model, `battery.charge` and `battery.runtime` aren't reliable through NUT. The shutdown policy should rely on status events (`ONBATT`, `ONLINE`, `LOWBATT`): when the power goes out, a timer starts; if power doesn't come back before it runs out, the server triggers a forced shutdown (FSD) of all machines.

## The architecture

The UPS is connected via USB to a Raspberry Pi 4, which runs the NUT server (`upsd`, port 3493) and is the only machine that talks to the unit directly. The other machines (another Raspberry Pi and the two Unraid servers) are network clients: they track the UPS status and shut down when the server tells them to. On the same Pi, [PeaNUT](https://github.com/Brandawg93/PeaNUT) provides a web dashboard, and `upslog` records voltage, frequency, load and status every minute.

The policy is simple: 120 seconds on battery (enough to ignore brief fluctuations) and the Pi triggers the FSD. If the UPS signals low battery before that, shutdown is immediate. Below are three ways to set this up: with Ansible, by hand or on Unraid.

## 1. With Ansible

This whole configuration lives in the `nut-tools` role of the public version of my infrastructure repository, [ansible-homelab](https://github.com/lmagdiel/ansible-homelab). The role decides what to install based on the inventory:

```ini
[nut_server]
pi4

[nut_clients]
pizero
```

On the server, it installs `nut-server`, `nut-client` and `nut-monitor`, applies the udev rule, generates every file in `/etc/nut` from templates, creates the logging service (`nut-logger`), installs the `upssched` script and brings up PeaNUT in Docker. On the clients, it installs only `nut-client` and points `upsmon` to the server. The main variables live in the role defaults:

```yaml
nut_ups_name: tsshara
nut_ups_driver: blazer_ser
nut_onbatt_shutdown_delay: '120'
nut_udev_id_vendor: '0483'
nut_udev_id_product: '5740'
nut_udev_serial: '00000000001A'   # check the one on your unit
nut_udev_symlink: ttyTSSHARA0
nut_upsd_port: 3493
nut_upsmon_password: "{{ vault_nut_upsmon_password }}"
nut_upsmon_secondary_password: "{{ vault_nut_upsmon_secondary_password }}"
```

The passwords are kept in Ansible Vault. To apply just this part:

```bash
ansible-playbook run_homelab.yml -l pi_servers --tags nut
```

## 2. By hand (Debian or Raspberry Pi OS)

Without Ansible, you get the same result by writing a few files yourself. On the computer that will be connected to the UPS:

```bash
sudo apt install nut
lsusb | grep 0483:5740
udevadm info -a -n /dev/ttyACM0 | grep -m1 'ATTRS{serial}'
```

Create `/etc/udev/rules.d/99-ups-tsshara.rules` (all on a single line) with the serial number you found:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="5740", ATTRS{serial}=="SEU_SERIAL", GROUP="nut", MODE="0660", SYMLINK+="ttyTSSHARA0"
```

Then run `sudo udevadm control --reload-rules && sudo udevadm trigger` and configure NUT:

```ini
# /etc/nut/nut.conf
MODE=netserver

# /etc/nut/ups.conf
maxretry = 3
[tsshara]
  driver = blazer_ser
  port = /dev/ttyTSSHARA0
  pollinterval = 15
  desc = "TS Shara"

# /etc/nut/upsd.conf
LISTEN 0.0.0.0 3493
MAXAGE 25

# /etc/nut/upsd.users
[upsmon]
  password = "SENHA_PRIMARIA"
  upsmon primary
[upsmonsecondary]
  password = "SENHA_SECUNDARIA"
  upsmon secondary
```

In `/etc/nut/upsmon.conf`, the essentials are:

```
MONITOR tsshara@localhost 1 upsmon "SENHA_PRIMARIA" primary
SHUTDOWNCMD "/sbin/shutdown -h +0"
NOTIFYCMD /usr/sbin/upssched
NOTIFYFLAG ONBATT SYSLOG+WALL+EXEC
NOTIFYFLAG ONLINE SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT SYSLOG+WALL+EXEC
DEADTIME 15
HOSTSYNC 15
POWERDOWNFLAG /etc/killpower
```

And the timer goes in `/etc/nut/upssched.conf`:

```
CMDSCRIPT /usr/sbin/upssched-cmd
PIPEFN /run/nut/upssched.pipe
LOCKFN /run/nut/upssched.lock
AT ONBATT * START-TIMER onbatt_shutdown 120
AT ONLINE * CANCEL-TIMER onbatt_shutdown online
AT LOWBATT * EXECUTE lowbatt_shutdown
```

The `/usr/sbin/upssched-cmd` script (owner `root:nut`, permissions `0750`) only needs to call `/usr/sbin/upsmon -c fsd` for `onbatt_shutdown` and `lowbatt_shutdown` and log everything else with `logger`. Restart with `sudo systemctl restart nut-server nut-monitor` and check with `upsc tsshara@localhost`.

On the clients, all you need is `sudo apt install nut-client`, `MODE=netclient` in `nut.conf` and, in `upsmon.conf`, a line pointing to the server's IP (not to the client itself, or it will never receive the FSD):

```
MONITOR tsshara@IP_DO_SERVIDOR 1 upsmonsecondary SENHA_SECUNDARIA secondary
SHUTDOWNCMD "/sbin/shutdown -h now"
```

Two fine-tuning tweaks worth making:

- **Battery voltage.** `blazer_ser` estimates the charge from the voltage, and the default values (`default.battery.voltage.high/low/nominal`) depend on how your unit reports the battery: the role uses 12 V values; the reference repository, 24 V. Check what shows up under `battery.voltage` in `upsc` and adjust. Even so, treat the percentage as a rough guide.
- **Cutting power at the end.** With `POWERDOWNFLAG`, once the server finishes shutting down, it asks the UPS to cut its output and turn back on when power returns. If a client takes a while to shut down (as Unraid does), increase `offdelay` in `ups.conf` so the cut doesn't catch it halfway through.

## 3. On Unraid

Unraid's native UPS support (under Settings › UPS Settings) is based on apcupsd, built for APC units, and won't work here. Leave it disabled and install the [Network UPS Tools (NUT) for UNRAID](https://github.com/desertwitch/NUT-unRAID) plugin from Community Applications. Since the UPS's USB connection is on the Raspberry Pi, Unraid joins as a network client:

- in the plugin, enable NUT in network client mode (netclient), pointing to the Pi's IP, port 3493, name `tsshara` and the secondary user;
- don't rely on the plugin's triggers based on battery percentage or runtime, which read the same unreliable numbers. The server makes the call, and the FSD reaches Unraid over the network. If you want a local safety net, use the time-on-battery trigger, with a value slightly higher than the server's;
- check the shutdown timeout under Settings › Disk Settings: stopping the array, VMs and containers takes time, and all of it has to fit within the UPS's runtime (and within `offdelay`, if you use the power cut);
- test from the Unraid terminal with `upsc tsshara@IP_DO_PI` and, on a quiet day, unplug the UPS to watch the whole chain work.

## Conclusion

With the interface installed, the technical part went smoothly, but I had to spend a good while testing and configuring everything. I'm leaving it all here for anyone who needs it.
