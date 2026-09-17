function FieldTagsNote() {
  return (
    <div className="sidenote-anchor" id="field-tags-note">
      <aside className="article-sidenote" aria-label="Detour: why not three-bit field tags">
        <span className="sidenote-type">DETOUR</span>
        <h3>Why not three-bit field tags?</h3>
        <p>
          I considered numbering metadata fields and putting a small tag before each value. That can be useful for
          optional or extensible messages. Here, every packet needs the same small set of fields.
        </p>
        <p>
          A fixed layout already identifies them by position: bytes 6 through 9 are always the frame ID. Adding field
          tags would create another parsing rule without solving a problem this version had.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> Why not three-bit field tags?</summary>
        <p>
          I considered numbering metadata fields and putting a small tag before each value. That can be useful for
          optional or extensible messages. Here, every packet needs the same small set of fields.
        </p>
        <p>
          A fixed layout already identifies them by position: bytes 6 through 9 are always the frame ID. Adding field
          tags would create another parsing rule without solving a problem this version had.
        </p>
      </details>
    </div>
  )
}

export default function UdpChapter() {
  return (
    <section className="chapter-with-sidenote" id="a-tiny-udp-protocol">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">08</span><span>A Tiny UDP Protocol, Deliberately</span></h2>

        <p>At this point, I could capture a screen image on the Mac and turn it into an H.264 access unit.</p>
        <p>Which was great, except the ThinkPad was still somewhere else.</p>
        <p>
          I now had a sequence of encoded bytes, and I needed to get those bytes across the network without losing
          track of which image they belonged to. The codec had solved a compression problem. I still needed to decide
          how the two programs would communicate.
        </p>
        <p>That became a small protocol I called JUAN.</p>
        <p>Quite convenient to have a short name.</p>

        <h3>What UDP gives me</h3>
        <p>
          UDP lets an application send individual messages called datagrams. On the receiving side, a normal receive
          operation gives me one datagram and its length.
        </p>
        <p>
          That boundary is useful. If I send a header followed by some video bytes in one datagram, the receiver knows
          where that particular message ends.
        </p>
        <p>
          But UDP does not promise that every datagram will arrive, that they will arrive in order, or that a successful
          send means the receiver has processed anything.
        </p>
        <p>So my application needed answers to a few questions:</p>
        <ul>
          <li>Which access unit does this datagram belong to?</li>
          <li>Where do its bytes go?</li>
          <li>How many pieces should exist?</li>
          <li>Have I received all of them?</li>
          <li>If I have not, when should I give up?</li>
        </ul>
        <p>
          I used UDP because I wanted to explore those decisions directly. It also gave the application control over
          abandoning incomplete work when the stream moved on.
        </p>
        <p>
          That does not make UDP automatically low latency. An application can build enormous queues on top of it. It
          can also send traffic much faster than the receiver can consume. I would get a fairly memorable demonstration
          of that.
        </p>

        <h3>One access unit can need many packets</h3>
        <p>
          H.264 made ordinary frames much smaller, especially when most of the desktop stayed still. Some outputs fit
          inside one datagram. Keyframes were different.
        </p>
        <p>For example, an access unit containing 294,000 bytes needs:</p>
        <pre className="article-code"><code>{'ceil(294,000 / 1,200) = 245 packets'}</code></pre>
        <p>
          Melquiades allows up to 1,200 bytes of encoded video in each packet. Each one also carries a 14-byte
          application header:
        </p>
        <pre className="article-code"><code>{'14-byte JUAN header + up to 1,200 video bytes'}</code></pre>
        <p>
          That makes the largest UDP payload 1,214 bytes. With an ordinary 20-byte IPv4 header and an 8-byte UDP
          header, the IP packet is 1,242 bytes.
        </p>
        <p>
          The purpose of this size was to leave room beneath a typical 1,500-byte network MTU. The MTU describes how
          large an IP packet a link can carry without fragmentation. This is still an assumption about the path. A
          smaller MTU, a tunnel, or additional encapsulation can change the budget.{' '}
          <a href="https://www.rfc-editor.org/rfc/rfc8085.html#section-3.2">RFC 8085, message size guidelines</a>
        </p>
        <p>There are two different kinds of splitting here:</p>
        <pre className="article-code"><code>{'Melquiades:\none access unit → many independently sent UDP datagrams\n\nIP fragmentation:\none oversized IP packet → multiple IP fragments'}</code></pre>
        <p>
          My chunking happens in the application. It gives my receiver explicit identifiers and boundaries to inspect.
          It does not make the video immune to loss.
        </p>

        <h3>The header</h3>
        <p>
          The original raw-frame protocol carried information such as width, height, pixel format, and raw image
          length. Those fields made sense when the receiver needed to reconstruct a particular raw pixel layout. With
          H.264, the decoder obtains image configuration from the encoded stream and its parameter sets.
        </p>
        <p>I could simplify the transport header:</p>
        <div className="article-table-wrapper">
          <table className="article-table">
            <thead>
              <tr><th scope="col">Byte offsets</th><th scope="col">Field</th><th scope="col">Size</th><th scope="col">Meaning</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">0–3</th><td>Signature</td><td>4 bytes</td><td>The ASCII bytes <code>JUAN</code></td></tr>
              <tr><th scope="row">4</th><td>Version</td><td>1 byte</td><td>Version <code>1</code>, the H.264 transport</td></tr>
              <tr><th scope="row">5</th><td>Flags</td><td>1 byte</td><td>Keyframe and parameter-set indicators</td></tr>
              <tr><th scope="row">6–9</th><td>Frame ID</td><td>4 bytes</td><td>Identifies one complete access unit</td></tr>
              <tr><th scope="row">10–11</th><td>Chunk index</td><td>2 bytes</td><td>This fragment&apos;s zero-based position</td></tr>
              <tr><th scope="row">12–13</th><td>Total chunks</td><td>2 bytes</td><td>Number of fragments in the access unit</td></tr>
            </tbody>
          </table>
        </div>
        <p>Fourteen bytes altogether.</p>
        <p>
          The multi-byte integers use big-endian encoding. That means the most significant byte comes first,
          regardless of how either computer stores integers internally.
        </p>
        <pre className="article-code"><code>{'frame_id = 42\n\nwire bytes:\n00 00 00 2A'}</code></pre>
        <p>
          I explicitly serialize those fields. Sending the raw memory of a Rust struct would make the format depend on
          details such as layout, padding, and byte order. The protocol is the sequence of bytes we agree on.
        </p>

        <h3>Why does a packet need my name?</h3>
        <p>
          The signature is a recognizable prefix, often called a magic value. When a datagram arrives, the receiver can
          quickly check whether its first four bytes match the format it expects. A packet beginning with something else
          can be rejected before trying to interpret the remaining fields.
        </p>
        <pre className="article-code"><code>{'JUAN\n4A 55 41 4E'}</code></pre>
        <p>
          It could have been another fixed value. There is nothing special about those letters beyond making packet
          dumps slightly more entertaining. The signature does not authenticate the sender. Anyone who knows the format
          can write the same four bytes. Its job is recognition.
        </p>
        <p>
          The version byte tells the receiver which interpretation follows. Version one means this particular H.264
          access-unit protocol. If a future experiment changes the layout or introduces another codec, both ends need an
          explicit way to distinguish that change.
        </p>

        <h3>What the flags mean</h3>
        <p>The first two bits summarize properties of the whole access unit:</p>
        <pre className="article-code"><code>{'bit 0: contains an IDR/keyframe\nbit 1: contains parameter sets\n\n00000011:\nboth indicators are set'}</code></pre>
        <p>
          Those are separate facts. A recovery picture and the configuration needed to decode it are related, but they
          are not interchangeable.
        </p>
        <p>
          These flags let the receiver decide whether an assembled unit is a candidate for decoder recovery. They do
          not replace inspecting or decoding the actual H.264 data, and setting a bit cannot make malformed bytes valid.
          The remaining bits are unused in this version. There is no implemented discontinuity flag hiding in them.
        </p>

        <h3>Why repeat the header in every packet?</h3>
        <p>
          I initially wondered whether I could distribute different metadata across different packets. Put one field
          here, another there, and save some repeated information.
        </p>
        <p>
          But packets can arrive out of order, and the first packet can disappear. If only chunk zero identified the
          access unit, receiving chunk seventeen first would leave the receiver waiting for information it needed to
          interpret a packet it already had.
        </p>
        <p>Instead, every fragment says:</p>
        <pre className="article-code"><code>{'I belong to access unit 42.\nI am chunk 2.\nThere are 3 chunks.\nThese are the access unit’s flags.'}</code></pre>
        <p>
          That gives each fragment enough context to be placed immediately. For a 245-packet access unit, repeating the
          14-byte header costs 3,430 bytes. Saving a few bytes of application metadata was not the most useful
          optimization at this stage.
        </p>
        <div className="sidenote-row">
          <p>
            I also considered a more tagged format. <a className="sidenote-reference" href="#field-tags-note">Why not three-bit field tags?</a>
          </p>
          <FieldTagsNote />
        </div>

        <h3>Why there is no payload-length field</h3>
        <p>The receive operation tells me how many bytes arrived in the datagram. Once I subtract the fixed header size, I know the payload length:</p>
        <pre className="article-code"><code>{'payload length = received datagram length − 14'}</code></pre>
        <p>Repeating that length inside the application header would give me two values that could disagree.</p>
        <p>
          However, I still need to know where each fragment belongs. That is why version one requires every fragment
          except the final one to contain exactly 1,200 payload bytes.
        </p>
        <div className="article-table-wrapper">
          <table className="article-table">
            <thead><tr><th scope="col">Chunk index</th><th scope="col">Payload length</th><th scope="col">Destination offset</th></tr></thead>
            <tbody>
              <tr><th scope="row">0</th><td>1,200 bytes</td><td>0</td></tr>
              <tr><th scope="row">1</th><td>1,200 bytes</td><td>1,200</td></tr>
              <tr><th scope="row">2</th><td>500 bytes</td><td>2,400</td></tr>
            </tbody>
          </table>
        </div>
        <pre className="article-code"><code>{'offset = chunk_index × 1,200'}</code></pre>
        <p>
          If chunk two arrives first, I can copy its 500 bytes into the correct location immediately. The final
          fragment can also contain a full 1,200 bytes. Its index, rather than its length, tells me that it is the last
          fragment. Removing the length field worked because I replaced it with a precise rule shared by sender and receiver.
        </p>

        <h3>Reassembly is bookkeeping</h3>
        <p>The receiver keeps storage for one access unit currently being assembled, plus a bitmap recording which chunk indices have arrived.</p>
        <pre className="article-code"><code>{'expected:  0 1 2 3 4\nreceived:  1 1 0 1 1'}</code></pre>
        <p>Chunk two is missing.</p>
        <p>
          When another packet arrives, the receiver validates its metadata, checks the bitmap, copies new payload bytes
          into their calculated position, and marks that index as received. The bitmap matters because UDP packets can
          be duplicated. Receiving chunk one twice must not make the receiver believe it has received two different pieces.
        </p>
        <p>
          Before accepting a fragment, the implementation checks the signature, version, chunk range, payload size, and
          consistency with the access unit already in progress. A non-final fragment with a short payload is rejected
          because it violates the fixed-offset rule. It also caps the allocation implied by <code>total_chunks</code>. A
          field in a network packet should not be allowed to request arbitrarily large amounts of memory.
        </p>
        <p>Only when every distinct chunk has arrived does the access unit become eligible for decoding.</p>

        <h3>The receiver has a deliberately small view of the world</h3>
        <p>
          The current reassembler tracks one access unit at a time. It can accept that unit&apos;s fragments out of order.
          But if a newer frame ID arrives while the current unit is incomplete, it abandons the older unit and starts
          assembling the newer one. Late fragments from the abandoned unit are ignored.
        </p>
        <p>
          That keeps the implementation small, but it has a consequence: reordering across access-unit boundaries can
          make the receiver give up too early.
        </p>
        <pre className="article-code"><code>{'frame 100: almost complete\nframe 101: first packet arrives\nframe 100: final packet arrives late'}</code></pre>
        <p>
          The current receiver has already moved on. A more capable receiver could keep a bounded window of in-progress
          access units and use deadlines. That would tolerate more reordering, at the cost of more state and a decision
          about how long to wait.
        </p>
        <p>My current implementation does not have that window or a dedicated reassembly timeout. Its normal abandonment decision is driven by the arrival of a newer access unit.</p>

        <h3>What the small header leaves out</h3>
        <p>
          A short header is partly the result of doing less. There is no capture timestamp or presentation timestamp on
          this wire format. The encoder&apos;s internal frame representation has <code>source_pts_us</code>, but version one
          does not transmit it.
        </p>
        <p>
          That is enough for this immediate-display experiment, which has no audio synchronization. It is not enough
          for a general media clock, scheduled playout, or direct source-to-receiver age measurement. Even with
          timestamps, comparing clocks on two computers needs additional care.
        </p>
        <p>
          There is also no session identifier or stream epoch. Frame IDs distinguish access units within the running
          stream, but a restarted sender starting again from zero needs explicit handling. Wraparound-aware frame
          ordering does not solve session identity.
        </p>
        <p>
          Another limitation is loss detection. The receiver notices missing chunks in an access unit it started
          assembling. That is different from noticing an entire access unit whose packets all vanished. If complete
          frame 100 is followed by complete frame 102, the missing frame 101 deserves attention too.
        </p>
        <p>
          Finally, H.264 changes what “drop stale frames” can mean. Dropping a raw image before encoding is different
          from dropping an encoded reference picture that later pictures depend on. The freshness policy from the raw
          pipeline cannot simply be copied across this boundary.
        </p>

        <h3>There is already a standard for this</h3>
        <p>
          While researching packetization, I found RFC 6184, which specifies how to carry H.264 over RTP. It defines
          arrangements such as a single NAL unit in a packet, aggregation of smaller NAL units, and fragmentation units
          such as FU-A for splitting a larger NAL unit across RTP packets. <a href="https://datatracker.ietf.org/doc/html/rfc6184">RFC 6184</a>
        </p>
        <p>
          JUAN uses a simpler arrangement: take a complete Annex B access unit and split its byte sequence into
          fixed-size chunks. Those chunk boundaries do not need to line up with NAL boundaries. An RTP receiver cannot
          understand my packets just because both systems carry H.264.
        </p>
        <p>
          The little header also does not supply the larger machinery of a real-time transport: reception feedback,
          repair, congestion adaptation, synchronization, or secure sessions. UDP applications still need to address
          congestion; selecting UDP does not remove that responsibility. <a href="https://www.rfc-editor.org/rfc/rfc8085.html#section-3.1">RFC 8085, congestion control</a>
        </p>
        <p>
          For this controlled LAN experiment, the small protocol gave me something I could inspect completely. I could
          follow one encoded access unit from the Mac, through its fragments, into the Linux reassembly buffer.
        </p>
        <p>
          The first receiver command, <code>h264-recv</code>, only verified that transport. It printed completed access
          units. It did not decode them or open a window. Adding <code>h264-display</code> completed that next step.
        </p>
        <p>And then I could finally see my Mac screen on the ThinkPad.</p>
        <p>For a while, it looked surprisingly responsive.</p>
        <p>Then it froze.</p>
      </div>
    </section>
  )
}

