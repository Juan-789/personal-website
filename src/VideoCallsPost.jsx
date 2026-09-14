const remainingChapters = [
  ['02', 'Pixels are much bigger than they look', 'Raw-frame size, bandwidth, and why codecs exist.'],
  ['03', 'The first surprise: “30 fps” was actually 15 fps', 'Measure the physical source before optimizing software.'],
  ['04', 'Bounded ownership, not a growing queue', 'Four slots, SPSC ownership, and dropping stale work.'],
  ['05', 'Screen capture is not one API', 'Portal and PipeWire on Linux; ScreenCaptureKit on macOS.'],
  ['06', 'Why Deflate was useful—and not enough', 'A simple baseline before motion-aware compression.'],
  ['07', 'What H.264 actually changed', 'Access units, NAL units, IDRs, SPS/PPS, and AVCC → Annex B.'],
  ['08', 'A tiny UDP protocol, on purpose', 'The 14-byte JUAN header and the limits of an experimental LAN protocol.'],
  ['09', 'The stream froze', 'How keyframe bursts overflowed a Linux receive buffer.'],
  ['10', 'What the measurements actually say', 'Software timings versus honest glass-to-glass latency.'],
  ['11', 'What is unfinished', 'The boundaries that still own latency.'],
  ['12', 'What comes next', 'Controlled 30/60 fps experiments, high-speed measurement, and BedWars.'],
]

function IrisEvidence() {
  return (
    <div className="sidenote-anchor" id="iris-evidence">
      <aside className="article-sidenote" aria-label="Evidence: standalone videophones">
        <span className="sidenote-type">EVIDENCE</span>
        <img
          className="sidenote-image"
          src="/acn_phone.png"
          alt="ACN IRIS V digital video phone"
        />
        <h3>ACN IRIS V</h3>
        <p>
          A small, self-contained video phone: handset, camera, display, keypad, and an Internet connection in one
          desk-phone-shaped machine.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>EVIDENCE</span> ACN IRIS V</summary>
        <img
          className="sidenote-image"
          src="/acn_phone.png"
          alt="ACN IRIS V digital video phone"
        />
        <p>
          A small, self-contained video phone: handset, camera, display, keypad, and an Internet connection in one
          desk-phone-shaped machine.
        </p>
      </details>
    </div>
  )
}

export default function VideoCallsPost() {
  return (
    <article className="writing-article video-call-post">
      <p className="article-kicker">WRITING</p>
      <h1>How Do Video Calls Work?</h1>
      <p className="article-dek">
        An experiment in understanding the machinery that makes a conversation feel like it is happening now.
      </p>

      <section className="chapter-with-sidenote">
        <div className="chapter-main">
          <h2 className="chapter-title"><span className="chapter-index">01</span><span>The question behind Melquiades</span></h2>
          <p>One of the things I admire most about modern technology is how ubiquitous video calling has become.</p>

          <p>
            Not that long ago, seeing the person on the other end of a call meant using specialized hardware or a
            dedicated application. I remember standalone videophones such as <a className="sidenote-reference" href="#iris-evidence">ACN&apos;s IRIS devices</a>:
            desk-phone-like
            machines with a handset, camera, screen, and Internet connection. Then applications like Skype made
            calling someone across the world feel strangely normal.
          </p>

          <p>Now video calling is everywhere.</p>

          <p>
            It is built into phones, laptops, consoles, and sometimes just a browser tab. You can open Google Meet,
            Discord, FaceTime, WhatsApp, or Zoom, press one button, and suddenly a camera, microphone, encoder,
            network connection, and display pipeline are cooperating closely enough that you can forget they exist.
          </p>

          <p>That is honestly pretty sick.</p>

          <p>But it also made me wonder: how does this actually work?</p>

          <p>
            A call has to feel close to real time. It needs to carry audio and video, survive imperfect networks,
            avoid freezing, avoid showing old frames, and make all of that feel simple enough that nobody thinks
            about it while they are talking.
          </p>

          <p>At a high level, I assumed the video part worked like this:</p>

          <div className="article-flow" aria-label="A simple video-call pipeline">
            <span>camera or screen</span><i aria-hidden="true">→</i><span>capture an image</span>
            <i aria-hidden="true">→</i><span>send it through UDP</span><i aria-hidden="true">→</i><span>display it somewhere else</span>
          </div>

          <p>That is not wrong. It is just incomplete.</p>

          <p>
            The difficult part is everything needed to stop that pipeline from becoming slow, jittery, memory-hungry,
            or visually stale. What happens if the camera creates frames faster than the sender can process them?
            What happens when an H.264 keyframe is split into hundreds of packets and a few vanish? What happens if
            the receiver is busy decoding while more packets keep arriving? And what does “low latency” really mean
            when the camera, operating system, codec, network, compositor, and display all have their own queues?
          </p>

          <p>I wanted to find out.</p>

          <p>
            So I built Melquiades: a deliberately small, experimental streaming system written in Rust. It began
            with a ThinkPad camera sending video to a Mac screen, and later grew into a macOS screen-capture-to-Linux
            H.264 stream.
          </p>

          <p>
            It is not a replacement for Zoom, Discord, or Google Meet. It does not have audio, encryption, NAT
            traversal, congestion control, calls with multiple people, or Internet connectivity. Those are all
            serious problems that mature systems solve.
          </p>

          <p>
            Melquiades is narrower on purpose. I wanted to see the machinery underneath the abstraction: raw frame
            bytes, capture permissions, bounded queues, codecs, packet headers, UDP bursts, decoder recovery, and
            the point where a system stops showing “live video” and starts showing the past.
          </p>

          <h3>Objective</h3>
          <p>The project&apos;s objective is simple:</p>
          <blockquote>Stream a screen or camera image from machine A to machine B while keeping the displayed image recent.</blockquote>

          <div className="article-flow" aria-label="Melquiades processing pipeline">
            <span>source pixels</span><i aria-hidden="true">→</i><span>capture</span><i aria-hidden="true">→</i><span>encode or compress</span>
            <i aria-hidden="true">→</i><span>packetize</span><i aria-hidden="true">→</i><span>send over LAN</span><i aria-hidden="true">→</i>
            <span>reassemble</span><i aria-hidden="true">→</i><span>decode</span><i aria-hidden="true">→</i><span>display</span>
          </div>

          <p>Each arrow hides a decision.</p>

          <p>
            Who owns the frame memory? When should a frame be dropped? How large can a packet be? What happens if
            packets arrive out of order? Can the decoder recover after losing a keyframe? Is the measured time actual
            display latency, or only the time until a graphics API accepts some pixels?
          </p>

          <p>Those questions became the project.</p>

          <h3>Constraints</h3>
          <p>The first experiments used hardware I already had:</p>
          <ul>
            <li>a ThinkPad with a 60 Hz screen and a 30 fps integrated camera;</li>
            <li>a Mac mini with a 100 Hz display;</li>
            <li>a local network connection;</li>
            <li>Rust and operating-system media APIs;</li>
            <li>a preference for recent frames over a growing queue of complete but old ones.</li>
          </ul>

          <p>
            The LAN constraint is important. Sending video across the public Internet is not just changing an IP
            address. Real systems need peer discovery, NAT traversal, relays when direct connections fail,
            encryption, congestion control, and adaptation to networks that change while the call is happening.
          </p>

          <p>That is the territory where WebRTC becomes useful.</p>

          <h3>What about WebRTC?</h3>
          <p>
            WebRTC exists because browser-based real-time media is difficult. It provides the pieces needed to
            capture media, negotiate connectivity, transport it securely, handle loss, and adapt to network
            conditions.
          </p>

          <p>For a real video-call product, I would start there.</p>

          <p>
            But I was interested in seeing what those abstractions protect us from. I wanted to understand why a
            system needs a codec instead of a generic compressor, why video frames need a freshness policy, why a
            missing UDP packet can freeze an otherwise fast stream, and why the kernel&apos;s socket buffer can matter as
            much as the code I wrote.
          </p>

          <p>Melquiades is not an attempt to rebuild WebRTC.</p>
          <p>It is an attempt to earn a better mental model of it.</p>

          <p>The first question was much smaller:</p>
          <blockquote>How do I get one frame from my ThinkPad camera onto my Mac&apos;s screen?</blockquote>
          <p>That is where the experiment started.</p>
        </div>

        <IrisEvidence />
      </section>

      <section className="article-outline" aria-label="Remaining chapter outline">
        <p className="outline-label">STILL TO WRITE</p>
        <ol>
          {remainingChapters.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
