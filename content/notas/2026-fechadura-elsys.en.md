---
title: "An (in)discreet lock"
date: 2026-09-01
description: "Buying and installing the Elsys ESF-DE2000B digital lock: what I didn't know about door standards, silent mode, and firmware shared across brands."
assuntos: ["Home", "Equipment"]
---
The front door handle was already on its last legs, so I decided to take advantage of replacing it to retire physical keys once and for all. The plan was simple: a mortise smart lock to replace the entire assembly (handle, cylinder, and mortise lock) with a single, sleek unit featuring passcode and fingerprint access, completely offline.

I started by looking into Intelbras, the go-to brand here in Brazil, but ended up choosing Elsys, a name I knew thanks to the Elsys Streaming Box ETRI02.

## A quick aside

The Elsys Streaming Box ETRI02 was one of the best TV boxes I've ever owned: Android TV, 4K, and, a rarity in this category, a built-in digital TV tuner with an antenna input. Over-the-air channels and streaming on the same box with a single remote, no kludges required. Since a good product tends to earn goodwill for the brand, I decided to take a chance on their smart lock.

## Dumb as a door

The model I picked was the ESF-DE2000B, which unlocks via fingerprint, passcode, or an emergency physical key. It has no Wi-Fi, no app, and no hub, and that was strictly intentional. The connected model in the same lineup, the DE4000B, unlocks from your smartphone and generates temporary passcodes, but I needed none of that. On a front door, every extra feature is just another dependency: an app, an account on the manufacturer's cloud, a radio transmitter constantly draining batteries. Anyone who has ever automated a home with Tuya gear knows the drill all too well. The door simply needs to open fast when I get home and grab the handle. Period.

## So much for standards

The lock adheres to the Brazilian mortise standard, so I pictured a straightforward drop-in swap: pull out the old lock body, slide the new one into the existing cutout, drill mounting holes and a conduit for the cable, and call it a day. Order placed, I then stumbled upon reports warning that installation was far from trivial, taking several hours for anyone lacking experience. To avoid the fatigue (as Jaiminho the mailman would say), I opted to hire a locksmith, and thank goodness I did: it was so much trouble for the guy that I felt tired just watching him work.

Despite the supposed standard, the mechanism wouldn't fit into the existing mortise. He had to chisel out chunks of wood to accommodate it, plus drill straight through the door to route the wiring harness between the interior and exterior escutcheon plates. It took well over an hour of chiseling away at the wood, trimming the spindle to the exact length, and aligning the entire assembly. Labor came to R$300 (the going rate in Brasília's Plano Piloto).

## Chatterbox

The biggest letdown arrived right after. The ESF-DE2000B talks. It talks a lot. Every single configuration step is announced in a shrill, tinny voice blasting from the exterior panel, which directly faces the building's hallway. Registering an administrator, fingerprints, or passcodes becomes a public broadcast to the entire floor, precisely when you want the utmost discretion.

I dug into the menu and found the audio setting, which offered just two options: 1 to enable and 2 to disable. I chose disable; the voice chirped that the command was confirmed, yet the noise never stopped. That's when I uncovered the catch: "disable audio" on this lock only silences spoken feedback during day-to-day use. The setup menu is always spoken aloud, and the buzzer's loud beep on every lock and unlock cycle remains stubbornly active, since the firmware treats that beep as an operational status cue rather than voice audio. There is no volume control, let alone a genuine silent mode.

The go-to DIY workaround people suggest is slapping electrical tape over the buzzer grill. Unfortunately, on this model, the speaker grill is situated right on the front face of the panel in plain view. So my choices are: live with the piercing beep, or live with an ugly patch of tape stuck to my brand-new lock. The lone saving grace is that the low-battery warning doesn't trigger a continuous alarm down the corridor: it only beeps when someone actively touches the keypad.

## Same firmware, different badges

The detail I was unaware of, which explains this shortcoming, is that many of these smart locks share the exact same underlying architecture. It is the textbook OEM (white-label) model: Asian factories manufacture the generic hardware and firmware, while local brands merely customize the outer shell, stamp their logo, and flash a localized voice prompt pack.

That explains why the navigation hierarchy (asterisk and pound keys to start, 1 for users, 2 for deletion, and 3 for settings) is identical across locks from completely different brands. The audio quirks were not an isolated decision by Elsys, but an inherited artifact of the standard firmware baked into the product line. Brands that develop proprietary software in-house, as I found out later, typically offer granular volume control, including a true zero level.

## Taking stock

In everyday use, the lock delivers what matters most: fingerprint recognition is instantaneous, operation does not depend on internet stability, and the door now sports a clean look in place of the old patched-up hardware. Living without a physical key is truly liberating. Even so, if I were buying again today, an absolute silent mode would sit right at the top of my requirements list, and I would consult a locksmith in advance to know exactly how much of the door would have to be carved out.
