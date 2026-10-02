---
title: "A mini-ITX N100 NAS board, (well) made in China"
date: 2024-03-20
description: "The full spec sheet for the mini-ITX motherboard with an Intel N100, six SATA ports, and four 2.5 GbE ports, bought for my main server."
assuntos: ["Homelab", "Equipment"]
---
Today I bought the motherboard for my main server on AliExpress: a mini-ITX NAS board powered by an Intel N100, made by CWWK (also sold under the Topton brand), for R$1,198.50 (US$224.99). Boards like this pack into 17 × 17 cm what used to require dedicated expansion cards: 6 SATA ports, 2 M.2 NVMe slots, and 4 2.5 Gb network ports, paired with an energy-efficient processor. The catch is that information is scattered across the product listing, online forums, and the silkscreen on the board itself, so I've compiled the full spec sheet here.

{{< figura img="img/notas/placa-nas-n100.jpg" alt="Black mini-ITX motherboard with a copper plate over the processor, four network ports, six SATA connectors and two M.2 slots, next to a DDR5 memory stick and a cooler" legenda="The board in the listing photo." >}}

## Spec sheet

### Identification

- Manufacturer (OEM): CWWK (ChangWang), also sold as Topton; listed under the SZJN brand
- Board code: CW-ADLN-NAS, version 1.0.0
- Origin: mainland China

### Processor and memory

- Intel N100 (Alder Lake-N) soldered to the board (BGA), with a copper plate over the chip and mounting holes for LGA 115X coolers (75 × 75 mm)
- 1 DDR5 SO-DIMM slot: 4800 MT/s native, compatible with non-ECC 5200 and 5600 modules, up to 32 GB

### Storage

- 6 SATA 3.0 ports: SATA1 is native to the N100; SATA 2 through 6 go through a JMicron JMB585 controller
- 2 M.2 2280 NVMe slots, each on PCIe 3.0 x1
- 1 PCIe 3.0 x1 slot, which shares lanes with the second M.2: it's one or the other; you can't use both simultaneously

### Network

- 4 RJ-45 2.5 Gb ports, with Intel I226-V controllers
- Since it's a recent controller, it needs an up-to-date kernel: Proxmox VE 8.x, OPNsense 23.x or later, pfSense CE 2.7 or later, TrueNAS Scale, and recent Linux distributions

### Video, USB, and audio

- HDMI 2.1 and DisplayPort 1.4b, both up to 4K at 60 Hz
- 1 USB 3.0 Type-A, 2 USB 2.0 Type-A, and 1 USB-C (at USB 2.0 speed)
- Realtek ALC897 audio, with a combined 3.5 mm headphone and microphone jack

### Form factor and power

- Mini-ITX, 17 × 17 cm
- 24-pin ATX connector and 4-pin 12 V connector: both are required for the board to power on
- AT/ATX mode jumper (in AT mode, the board turns on by itself as soon as it gets power)

### Internal headers

- 2 PWM fan headers (CPU_FAN and SYS_FAN)
- TPM header (ASUS standard, 14-pin SPI)
- USB 2.0 header and 2 internal USB 2.0 Type-A ports
- Front panel header (FPANEL)

## Before you build

A warning from the listing that's worth repeating: the CR2032 CMOS battery is removed before shipping due to international air transit regulations, so make sure to have one on hand.

## The listing

Listings like this change or disappear without notice, so I saved a [copy of the listing at the time of purchase](/arquivos/placa-nas-n100-anuncio.pdf) (PDF, 2.4 MB), with the seller's photos and full description.

## Update (September 2026)

Two and a half years later, the board is still going strong in my main server. The full configuration is on the [setup](/en/tecnologia/setup/) page.
