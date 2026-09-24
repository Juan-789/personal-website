function SurvivorshipBiasNote() {
  return (
    <div className="sidenote-anchor" id="survivorship-bias-note">
      <aside className="article-sidenote" aria-label="Evidence: survivorship bias in latency measurements">
        <span className="sidenote-type">EVIDENCE</span>
        <img
          className="sidenote-image"
          src="/Survivorship-bias.svg"
          alt="Survivorship-bias diagram"
        />
        <h3>Survivorship bias</h3>
        <p>Successful-frame timing only describes the frames that survived long enough to be measured.</p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>EVIDENCE</span> Survivorship bias</summary>
        <img className="sidenote-image" src="/Survivorship-bias.svg" alt="Survivorship-bias diagram" />
        <p>Successful-frame timing only describes the frames that survived long enough to be measured.</p>
      </details>
    </div>
  )
}

export default function StreamFrozeChapter() {
  return (
    <section className="chapter-with-sidenote" id="the-stream-froze">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">09</span><span>The Stream Froze</span></h2>

        <p>The weird part was that it worked.</p>
        <p>I could move something on the Mac and see it update quickly on the ThinkPad. For a few seconds, the whole thing felt pretty good.</p>
        <p>
          Then the image would practically stop moving. Sometimes it recovered quickly. Other times it stayed frozen
          long enough that I wondered whether the program had stopped entirely. When it recovered, it could immediately
          feel responsive again.
        </p>
        <p>This was more confusing than a stream that was consistently slow.</p>
        <p>
          I even wondered whether dragging an application window over from another monitor had broken capture. Moving a
          window can change the image substantially and increase the amount of encoded data. That made it a plausible
          trigger for more traffic. But the action itself did not explain why the receiver could then spend seconds
          showing the same image.
        </p>
        <p>I needed to follow what happened after those pixels were captured.</p>

        <h3>The timings looked much better than the video</h3>
        <p>The receiver already printed measurements around decoding and presentation. A representative batch looked approximately like this:</p>
        <pre className="article-code"><code>{'complete access unit → return from present:\n\np50 ≈ 8.5 ms\np99 ≈ 23 ms'}</code></pre>
        <p>
          Those numbers did not resemble a ten-second freeze. But look at where that measurement begins: after an
          access unit is complete and selected for decoding.
        </p>
        <div className="sidenote-row">
          <p>
            If packets were missing, or the receiver was waiting for a recovery keyframe, that period did not become a
            slow decoded-frame sample. It often became no displayed sample at all. The measurements described frames that
            made it through.
          </p>
          <SurvivorshipBiasNote />
        </div>
        <p>
          That was a huge distinction. A system can process its successful frames quickly while failing to produce a new
          displayable frame for seconds. I needed to measure progress through the stream, not only processing time for
          the survivors.
        </p>

        <h3>The receiver was telling me what it was waiting for</h3>
        <p>The logs repeatedly contained messages like:</p>
        <pre className="article-code"><code>{'H.264 frame 960 lost: 22 of 276 packets missing; waiting for a recovery keyframe\nH.264 frame 990 lost: 24 of 278 packets missing; waiting for a recovery keyframe\nH.264 frame 1020 lost: 12 of 278 packets missing; waiting for a recovery keyframe'}</code></pre>
        <p>Later in that sequence:</p>
        <pre className="article-code"><code>{'H.264 frame 1290 lost: 2 of 238 packets missing; waiting for a recovery keyframe\nH.264 recovery at keyframe 1320 after skipping 348 access units'}</code></pre>
        <p>
          The frame IDs made the duration easier to understand. At the nominal 30 fps, the distance from frame 960 to
          frame 1320 represents about twelve seconds. This was not twelve seconds spent decoding one image. The receiver
          had lost a recovery point, then lost several later opportunities to recover.
        </p>
        <p>
          Melquiades deliberately waits for a complete IDR carrying SPS/PPS after detecting an incomplete access unit.
          Until then, it skips predicted frames rather than trusting reference pictures that may be missing.
        </p>
        <p>
          That is the conservative recovery policy. H.264 implementations can support other strategies, including error
          concealment. But my receiver had a fairly simple rule, and the visible freeze was the result.
        </p>
        <p>The next question was why the recovery frames kept disappearing.</p>

        <h3>“H.264 frames are small” needed an asterisk</h3>
        <p>
          Early on, I had been thinking about packet counts in terms of one packet, a few packets, or a few dozen. That
          described many ordinary frames. It did not describe all frames, and it was a bad assumption to carry into the
          receiver design.
        </p>
        <p>
          The sender&apos;s average access-unit size also hid the difference. A desktop stream can contain many tiny
          predicted frames and occasional much larger IDRs. So I added telemetry that separated them.
        </p>
        <div className="article-table-wrapper">
          <table className="article-table">
            <thead><tr><th scope="col">Measurement</th><th scope="col">Predicted access units</th><th scope="col">Keyframes</th></tr></thead>
            <tbody>
              <tr><th scope="row">Median encoded size</th><td>412 bytes</td><td>294,256 bytes</td></tr>
              <tr><th scope="row">Median packet count</th><td>1</td><td>246</td></tr>
              <tr><th scope="row">p99 encoded size</th><td>24,476 bytes</td><td>297,386 bytes</td></tr>
              <tr><th scope="row">p99 packet count</th><td>21</td><td>248</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The same stream could spend most of its time sending tiny updates, then suddenly emit hundreds of packets for
          one recovery image. There was no contradiction. H.264 output size depends on the image and how it is encoded.
          The periodic recovery picture has a different job from a small update to an already-known desktop.
        </p>
        <p>
          There was no useful universal rule saying that 200 packets were acceptable and 201 were too many. The relevant
          question was whether this sender, network, kernel, and receiver could absorb the burst.
        </p>

        <h3>Eight megabits per second did not mean smooth traffic</h3>
        <p>
          The encoder was configured with an average bitrate target of 8 Mb/s. I had to separate that setting from the
          way the program actually sent each access unit.
        </p>
        <p>
          Once a keyframe was ready, the UDP sender loop submitted its fragments one after another. There was no H.264
          packet pacing between them. The telemetry measured:
        </p>
        <pre className="article-code"><code>{'U0: first datagram accepted by the local socket\nU1: final datagram accepted by the local socket'}</code></pre>
        <p>Keyframe bursts commonly took about 1–3 milliseconds by that measurement.</p>
        <p>For scale, submitting 294,000 encoded bytes over 2.4 milliseconds corresponds to:</p>
        <pre className="article-code"><code>{'294,000 × 8 / 0.0024\n≈ 980,000,000 bits per second'}</code></pre>
        <p>
          That is roughly 980 Mb/s of application payload submitted over that short interval. It does not mean the
          Wi-Fi delivered the image at 980 Mb/s. The measurement stops at the sender&apos;s kernel. Data can still wait in
          other queues afterward.
        </p>
        <p>
          But it explains why an 8 Mb/s average target did not protect the receiver from a very concentrated burst. The
          encoder chose how many bits to spend over time. My sending loop decided how abruptly to hand those bits to the
          operating system.
        </p>

        <h3>The queue I had not been looking at</h3>
        <p>
          I had spent a lot of time making the application&apos;s frame queues bounded. There was another queue underneath
          them.
        </p>
        <p>
          When UDP datagrams reach the ThinkPad, the kernel can hold them in the socket&apos;s receive buffer until my
          program calls <code>recv_from</code>. The H.264 receive thread was doing several jobs:
        </p>
        <pre className="article-code"><code>{'receive datagrams\n    → reassemble an access unit\n    → decode H.264\n    → convert and copy the decoded pixels\n    → hand the image to the display thread\n    → return to receiving'}</code></pre>
        <p>
          While it was decoding and converting an image, it was not draining that socket. The stage labeled {' '}
          <code>decode</code> in my logs includes the decoder wrapper&apos;s conversion and copy work too. Its pauses could
          last several milliseconds, with longer outliers. A burst arriving during one of those pauses needed somewhere
          to wait.
        </p>
        <p>If the kernel queue filled first, some packets would never reach my Rust code.</p>

        <h3>My first diagnostic command hid the useful line</h3>
        <p>On the receiving ThinkPad, while the stream was running, I initially used:</p>
        <pre className="article-code"><code>{'ss -u -a -m -n | grep \':5000\''}</code></pre>
        <p>It showed:</p>
        <pre className="article-code"><code>{'UNCONN 0 0 0.0.0.0:5000 0.0.0.0:*'}</code></pre>
        <p>Which looked fairly uninteresting.</p>
        <p>
          The problem was my filter. The memory statistics appeared on the following line, which did not contain
          <code>:5000</code>. <code>grep</code> removed exactly the information I needed.
        </p>
        <p>Using the socket filter directly preserved it:</p>
        <pre className="article-code"><code>{'ss -u -a -m -n \'sport = :5000\''}</code></pre>
        <p>Now the output included:</p>
        <pre className="article-code"><code>{'skmem:(r0,rb212992,t0,tb212992,f4096,w0,o0,bl0,d518)'}</code></pre>
        <div className="article-table-wrapper">
          <table className="article-table">
            <thead><tr><th scope="col">Field</th><th scope="col">Interpretation</th></tr></thead>
            <tbody>
              <tr><th scope="row"><code>r0</code></th><td>No receive memory allocated at that instant</td></tr>
              <tr><th scope="row"><code>rb212992</code></th><td>Receive-buffer accounting limit of 212,992 bytes, or 208 KiB</td></tr>
              <tr><th scope="row"><code>d518</code></th><td>Socket drop counter showing 518 dropped packets</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The <code>ss</code> manual documents the memory fields exposed by <code>-m</code>.{' '}
          <a href="https://man7.org/linux/man-pages/man8/ss.8.html">ss(8)</a>
        </p>
        <p>
          An empty queue at the moment I inspected it did not mean it had never overflowed. It could fill during a
          burst, drop packets, drain, and appear empty by the time I ran the command. The drop counter remembered
          something the snapshot of queue occupancy did not.
        </p>

        <h3>The kernel counters confirmed a receiving problem</h3>
        <p>I also collected UDP counters before, during, and after streaming:</p>
        <pre className="article-code"><code>{'nstat -az UdpInDatagrams UdpInErrors UdpRcvbufErrors UdpNoPorts'}</code></pre>
        <div className="article-table-wrapper">
          <table className="article-table">
            <thead><tr><th scope="col">Counter</th><th scope="col">Earlier</th><th scope="col">During</th><th scope="col">Later</th></tr></thead>
            <tbody>
              <tr><th scope="row"><code>UdpInDatagrams</code></th><td>16,000</td><td>40,021</td><td>43,758</td></tr>
              <tr><th scope="row"><code>UdpInErrors</code></th><td>777</td><td>1,271</td><td>1,342</td></tr>
              <tr><th scope="row"><code>UdpRcvbufErrors</code></th><td>777</td><td>1,271</td><td>1,342</td></tr>
              <tr><th scope="row"><code>UdpNoPorts</code></th><td>86</td><td>90</td><td>94</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>UdpRcvbufErrors</code> had increased by 565. These counters cover UDP traffic in the host&apos;s network
          namespace, not only Melquiades. Still, their increase during the test, together with the socket&apos;s own drop
          counter, established a concrete receive-buffer problem.
        </p>
        <p>
          The Linux UDP receive path records receive-buffer failures when it cannot enqueue a packet because of the
          socket&apos;s receive-memory limit. <a href="https://github.com/torvalds/linux/blob/master/net/ipv4/udp.c">Linux UDP receive implementation</a>
        </p>
        <p>
          This did not establish the cause of every missing packet. It did establish that some packets were reaching
          Linux and being dropped before my receiver could consume them. That was much more useful than “UDP is unreliable.”
        </p>

        <h3>How a short burst became a long freeze</h3>
        <p>
          The original socket limit was about 208 KiB. Many keyframes contained roughly 275–300 KB of encoded payload,
          before packet memory overhead. A keyframe being larger than the buffer does not guarantee overflow: the
          application can drain packets while others arrive. But if the receiver pauses, the queue has to absorb the
          difference.
        </p>
        <p>The observed behavior now made sense:</p>
        <pre className="article-code"><code>{'A complete IDR arrives.\nThe decoder recovers.\nSmall predicted frames display quickly.\n\nA later IDR arrives as a large packet burst.\nThe receive queue overflows.\nSome fragments are missing.\nThe receiver abandons the incomplete access unit.\n\nPredicted frames continue arriving.\nThe receiver waits for a usable recovery point.\nThe displayed image stays unchanged.'}</code></pre>
        <p>
          At a 30-frame keyframe interval and nominally 30 fps, recovery opportunities were roughly one second apart.
          But the next keyframe faced the same problem. Losing several consecutive keyframes therefore turned brief
          packet bursts into seconds of visible freezing.
        </p>
        <p>The packets needed to repair the stream were also the packets arriving in the largest groups.</p>

        <h3>Change one variable</h3>
        <p>The first experiment was deliberately narrow: increase the Linux display receiver&apos;s socket receive buffer.</p>
        <p>I checked the host&apos;s settings:</p>
        <pre className="article-code"><code>{'net.core.rmem_default = 212992\nnet.core.rmem_max = 4194304'}</code></pre>
        <p>
          The host already allowed a 4.19 MB request. I did not need to change the system-wide limit. The receiver was
          changed to request that buffer before binding port 5000, so the first arriving burst would get the larger queue too.
        </p>
        <p>At startup it printed:</p>
        <pre className="article-code"><code>{'H.264 UDP receive buffer:\nrequested=4194304 bytes, effective=8388608 bytes'}</code></pre>
        <p>
          Why did asking for four produce eight? Linux doubles the <code>SO_RCVBUF</code> value for accounting overhead
          and returns that doubled value when queried. That is not a promise that eight megabytes of application payload
          fit inside the queue. <a href="https://man7.org/linux/man-pages/man7/socket.7.html">socket(7), SO_RCVBUF</a>
        </p>
        <p>The active socket independently showed:</p>
        <pre className="article-code"><code>{'skmem:(r0,rb8388608,t0,tb212992,f4096,w0,o0,bl0,d0)'}</code></pre>
        <p>
          The encoder settings, H.264 packet pacing, receive/decode threading, and recovery policy stayed the same.
          That gave the experiment a clear prediction: if insufficient socket buffering was causing the observed drops,
          the receive-buffer error counter should stop increasing or improve substantially.
        </p>

        <h3>What actually improved</h3>
        <div className="article-table-wrapper">
          <table className="article-table">
            <thead><tr><th scope="col">Counter</th><th scope="col">Before</th><th scope="col">After</th><th scope="col">Change</th></tr></thead>
            <tbody>
              <tr><th scope="row"><code>UdpInDatagrams</code></th><td>49,044</td><td>71,764</td><td>+22,720</td></tr>
              <tr><th scope="row"><code>UdpInErrors</code></th><td>1,342</td><td>1,342</td><td>0</td></tr>
              <tr><th scope="row"><code>UdpRcvbufErrors</code></th><td>1,342</td><td>1,342</td><td>0</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The socket snapshot showed <code>d0</code>. The receiver logged one incomplete frame near startup, recovered
          at keyframe 30, and then produced five batches of 300 displayed frames without another loss or recovery
          message in the supplied log.
        </p>
        <p>The stream also felt substantially better.</p>
        <p>The workload was not restricted to tiny images. The largest logged keyframe contained:</p>
        <pre className="article-code"><code>{'624,424 bytes\n521 UDP fragments'}</code></pre>
        <p>
          That was larger than the keyframes in the earlier failing runs. The useful conclusion was that the buffer-only
          change addressed the observed overflow under the conditions of this run.
        </p>
        <p>
          There are limits to that conclusion. The workloads were not identical, the host counters were not exclusive to
          this stream, and the socket snapshot was not a final sample taken immediately before shutdown. The startup loss
          was not fully explained.
        </p>
        <p>
          But the evidence supported keeping the change: the error counter stopped growing, and the receiver kept
          producing images.
        </p>

        <h3>A bigger buffer does not automatically add four megabytes of delay</h3>
        <p>This initially sounds inconsistent with the earlier chapter about keeping queues small. Why make a queue larger?</p>
        <p>
          Because capacity and occupancy are different. A larger socket buffer gives a short burst somewhere to wait
          while the receiver catches up. It does not require the application to fill the buffer before reading anything.
        </p>
        <p>
          However, if packets arrive faster than the application can consume them for a sustained period, a larger buffer
          can hold more stale work. Eventually it still overflows. The improvement came from absorbing transient pressure
          in this experiment. It did not make receiver throughput unlimited.
        </p>
        <p>
          That distinction also explains why I still want the packet-ingestion loop separated from decoding. A long
          decode should not prevent the program from collecting packets that have already arrived.
        </p>

        <h3>There was a second failure hiding in the logs</h3>
        <p>The sender sometimes stopped with:</p>
        <pre className="article-code"><code>{'Connection refused (os error 61)'}</code></pre>
        <p>That was a separate issue.</p>
        <p>
          UDP does not establish a TCP-style connection, but a connected UDP socket can still receive an error associated
          with an earlier transmission. In the follow-up run, <code>UdpNoPorts</code> increased from 208 to 227. The
          receiver log ended with Ctrl-C, and socket observations included periods when nothing was listening on port 5000.
        </p>
        <p>
          Together, those observations were consistent with packets reaching an unbound port, Linux returning an ICMP
          port-unreachable response, and the Mac surfacing that refusal to the sender. We did not capture a packet trace
          establishing the exact timing. It was a supported explanation, not proof that every refusal had the same origin.
        </p>
        <p>The current sender treats that send error as fatal.</p>
        <p>So there were two visibly similar ways to end up staring at an unchanged screen:</p>
        <ul>
          <li>The sender remained active, but the receiver kept losing recovery frames.</li>
          <li>The sender had exited, so no future recovery frame was coming.</li>
        </ul>
        <p>The larger receive buffer addressed the first problem. It did not implement retry behavior for the second.</p>

        <h3>What I still want to test</h3>
        <p>
          Packet pacing is one experiment. The older raw transport already had a 25-microsecond gap between packets.
          The H.264 sender used in these measurements did not.
        </p>
        <p>
          Spacing a 245-packet access unit by 25 microseconds between packets adds about 6.1 milliseconds of intentional
          gaps. For the later 521-packet keyframe, it adds 13 milliseconds. That could reduce burst pressure, but it also
          extends the time needed to submit a complete access unit.
        </p>
        <p>
          Now that the buffer experiment stopped the observed overflow, pacing needs to demonstrate a benefit rather than
          being added automatically.
        </p>
        <p>
          Separating packet ingestion from decoding is another improvement. That needs a bounded handoff with a policy
          that understands H.264 dependencies. Blindly keeping only the newest encoded frame would be dangerous: a
          predicted picture can depend on an earlier picture discarded by that policy.
        </p>
        <p>
          Entirely missing access units also need explicit detection, not only missing chunks within units we partially
          received. And the sender needs deliberate behavior when the receiving application temporarily disappears.
        </p>
        <p>Those are follow-up tasks. The experiment in this chapter changed one buffer.</p>
        <p>
          What made it useful was the evidence around that change. I had a stream that looked frozen despite fast
          successful-frame timings. Separating keyframes from ordinary frames exposed the bursts. Socket statistics showed
          local drops. Kernel counters identified receive-buffer failures. A targeted change stopped those failures during
          the measured interval.
        </p>
        <p>The next chapter starts with the question those reassuring timing numbers still did not answer:</p>
        <blockquote>How far behind the Mac was the image I could actually see on the ThinkPad?</blockquote>
      </div>
    </section>
  )
}
