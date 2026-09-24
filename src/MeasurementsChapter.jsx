function P99Note() {
  return (
    <div className="sidenote-anchor" id="p99-note">
      <aside className="article-sidenote" aria-label="Detour: what p99 means">
        <span className="sidenote-type">DETOUR</span>
        <h3>What does p99 mean?</h3>
        <p>
          The median, or p50, describes the middle of the measured samples. The p99 describes a point near the slow
          end: roughly 99% of the samples are at or below it.
        </p>
        <p>
          Here, the samples are frames that reached the presentation call. Neither percentile includes an entry for
          every moment the viewer spent staring at a frozen image. As Chapter 9 showed, successful-frame timings need
          to be read alongside loss and recovery measurements.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> What does p99 mean?</summary>
        <p>
          The median, or p50, describes the middle of the measured samples. The p99 describes a point near the slow
          end: roughly 99% of the samples are at or below it.
        </p>
        <p>
          Here, the samples are frames that reached the presentation call. Neither percentile includes an entry for
          every moment the viewer spent staring at a frozen image. As Chapter 9 showed, successful-frame timings need
          to be read alongside loss and recovery measurements.
        </p>
      </details>
    </div>
  )
}

export default function MeasurementsChapter() {
  return (
    <section className="chapter-with-sidenote" id="what-the-measurements-actually-say">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">10</span><span>What the Measurements Actually Say</span></h2>

        <p>After fixing the receive-buffer problem, the stream finally felt consistently usable. Naturally, I wanted to know how fast it actually was.</p>
        <p>The receiver was reporting roughly nine milliseconds of processing time. Meanwhile, photographs of the two screens showed differences closer to fifty or sixty milliseconds.</p>
        <p>So where did the rest go?</p>
        <p>Before blaming the network, I had to ask a more annoying question: what exactly had I measured?</p>

        <h3>Nine milliseconds of what?</h3>
        <p>By this point, I had timestamps around several parts of the program. But a timestamp only knows where I put it. Calling a variable <code>decode_ends</code> does not guarantee that decoding is the only work that happened before it.</p>
        <p>For the H.264 receiver, these were the boundaries:</p>
        <div className="article-table-wrapper"><table className="article-table">
          <thead><tr><th scope="col">Interval</th><th scope="col">What actually happens inside it</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>T0 → T1</code></th><td>A complete access unit has passed the recovery checks; the decoder wrapper is about to run.</td></tr>
            <tr><th scope="row"><code>T1 → T2</code></th><td>H.264 decoding, YUV-to-RGBA conversion, a red/blue channel swap, and copying the resulting pixels into independently owned storage.</td></tr>
            <tr><th scope="row"><code>T2 → T3</code></th><td>Transfer to the display thread, any waiting there, obtaining the display buffer, and packing the pixels into its format.</td></tr>
            <tr><th scope="row"><code>T3 → T4</code></th><td>The call to <code>softbuffer::present()</code>.</td></tr>
            <tr><th scope="row"><code>T0 → T4</code></th><td>The entire measured receiver interval above.</td></tr>
          </tbody>
        </table></div>
        <p>That second row matters. My logs call it <code>decode</code>, but it measures the whole decoder wrapper, not just the time OpenH264 spends reconstructing a picture.</p>
        <p>If I eventually replace software decoding with hardware decoding, I cannot assume that this entire interval disappears. Conversion, memory ownership, and getting the result into the display still need to be handled.</p>
        <p>There was another easy number to misread: <code>T0 → T1</code> was almost zero.</p>
        <p>In the H.264 path, those timestamps are taken practically back-to-back. They do not surround the time packets spent waiting in the kernel. A tiny value there tells me very little about whether the socket queue was empty.</p>

        <h3>The receiver results</h3>
        <p>Across five batches from the receive-buffer experiment, the measurements looked like this:</p>
        <div className="sidenote-row">
          <div className="article-table-wrapper"><table className="article-table">
            <thead><tr><th scope="col">Measured interval</th><th scope="col">Range of batch medians</th><th scope="col">Range of batch p99 values</th></tr></thead>
            <tbody>
              <tr><th scope="row">Decode wrapper, including conversion and copying</th><td>6.50–8.13 ms</td><td>18.93–36.00 ms</td></tr>
              <tr><th scope="row">Display handoff and preparation</th><td>1.61–1.64 ms</td><td>2.35–2.73 ms</td></tr>
              <tr><th scope="row"><code>present()</code> call</th><td>About 0.022 ms</td><td>About 0.04–0.05 ms</td></tr>
              <tr><th scope="row">Entire measured receiver interval</th><td>8.16–9.80 ms</td><td>20.58–38.00 ms</td></tr>
            </tbody>
          </table></div>
          <P99Note />
        </div>
        <p>Each batch contained 300 frames that reached the presentation call. These ranges describe the separate batch summaries; they are not percentiles calculated over one combined dataset.</p>
        <p>The receiver total already includes the other rows. Adding them to it again would count the same work twice. Adding the individual stage medians would not necessarily reproduce the median total either: the median frame for one stage need not be the median frame for another.</p>
        <p>The useful conclusion was fairly specific: once a usable access unit reached this part of the receiver, preparing and submitting its image typically took around eight to ten milliseconds in those runs.</p>
        <p>That is a useful result. It is also only part of the trip.</p>

        <h3>Returning from <code>present()</code> is not the finish line</h3>
        <p>Twenty-two microseconds to present an image sounds amazing.</p>
        <p>Unfortunately, that is how long the function call took, not a measurement of how quickly the physical screen changed.</p>
        <p>For example, on Wayland, <code>softbuffer::present()</code> can issue requests that attach and commit a buffer to a surface. The documented operation is a presentation request, not a timestamp proving that the panel has finished displaying those pixels. <a href="https://docs.rs/softbuffer/latest/softbuffer/struct.Buffer.html#method.present">Softbuffer’s presentation documentation</a></p>
        <p>The compositor, display scheduling, scanout, and panel response still sit beyond my final timestamp.</p>
        <p>The beginning has a similar limitation. <code>T0</code> is taken after the access unit has been assembled and accepted for decoding. It excludes capture, encoding, transport, and whatever waiting happened before that point.</p>
        <p>My receiver timer starts late and finishes early relative to what a person sees.</p>

        <h3>Sending a packet is not measuring its journey</h3>
        <p>The sender’s measurements had their own boundary.</p>
        <p><code>U0 → U1</code> measured the interval between the first and final successful packet sends for an access unit. It told me how quickly the application submitted that burst to its local socket.</p>
        <p>It did not tell me when the ThinkPad received those packets.</p>
        <p>Similarly, the receiver’s first-to-final packet spread describes how long that arrival sequence took. It does not reveal how long the first packet travelled before arriving.</p>
        <p>These intervals can overlap. The receiver may already be collecting early packets while the sender is still submitting later ones. Adding every number in the logs would produce a very confident-looking answer with some time counted twice and other time missing entirely.</p>
        <p>I also could not subtract arbitrary timestamps from the two machines and call the result one-way latency. Rust’s <code>Instant</code> is useful for measuring local elapsed time; it is not a shared clock between the Mac and ThinkPad. <a href="https://doc.rust-lang.org/std/time/struct.Instant.html">Rust’s <code>Instant</code> documentation</a></p>
        <p>I needed a measurement that included the screens themselves.</p>

        <h3>Photographing the difference</h3>
        <p>The method was pretty simple.</p>
        <p>I opened a changing millisecond timer on the Mac and streamed that screen to the ThinkPad. Then I photographed both displays in the same shot.</p>
        <p>The ThinkPad was showing an older image of the same timer, not running a second independent stopwatch. That meant I could compare the displayed values without synchronizing the computers’ clocks.</p>
        <p>In the two photographs included with this article:</p>
        <div className="article-table-wrapper"><table className="article-table">
          <thead><tr><th scope="col">Mac display</th><th scope="col">Streamed ThinkPad display</th><th scope="col">Difference</th></tr></thead>
          <tbody>
            <tr><td>51,087 ms</td><td>51,037 ms</td><td>50 ms</td></tr>
            <tr><td>26,622 ms</td><td>26,562 ms</td><td>60 ms</td></tr>
          </tbody>
        </table></div>
        <section className="glass-to-glass-placeholders" aria-label="Screen-to-screen latency photographs">
          <figure className="glass-to-glass-placeholder">
            <img className="glass-to-glass-photo" src="/IMG_0478_2.jpg" alt="A screen-to-screen latency timer on the Mac display and its streamed result on the ThinkPad" />
            <figcaption>Screen-to-screen measurement, approximately 50 ms.</figcaption>
          </figure>
          <figure className="glass-to-glass-placeholder">
            <img className="glass-to-glass-photo" src="/IMG_0482.jpg" alt="A second screen-to-screen latency measurement between the Mac display and ThinkPad" />
            <figcaption>Screen-to-screen measurement, approximately 60 ms.</figcaption>
          </figure>
        </section>
        <p>Seeing those numbers was honestly pretty satisfying. There was a visible result to put next to all the terminal output.</p>
        <p>For this experiment, <strong>screen-to-screen delay</strong> is the most precise description. I had also been calling it glass-to-glass, but this was screen capture: a webcam was not capturing the source monitor. The phone camera was only observing the two displays for the measurement.</p>

        <h3>What those photos prove, and what they do not</h3>
        <p>The photos show readable examples where the ThinkPad’s displayed timer was approximately fifty or sixty milliseconds behind the Mac’s.</p>
        <p>They do not establish a fifty-millisecond average. They do not give me a p99. They do not prove that every frame stays inside that range.</p>
        <p>The timer displays whole milliseconds, but that does not make the measurement accurate to one millisecond. Its visible digits change with rendered updates, and the photograph can catch a display during a transition. Camera exposure can also make neighbouring updates overlap, which is why some pictures were harder to read than others.</p>
        <p>There is another subtlety: screen capture reads an image from the system, not light from the source panel. The source screen has its own presentation delay. Comparing the two visible timers therefore measures their displayed difference, not every millisecond since the application originally produced the source image.</p>
        <p>That is still a useful measurement. I just need to describe the endpoints honestly.</p>

        <h3>Three different rates</h3>
        <p>My setup had three relevant rates:</p>
        <div className="article-table-wrapper"><table className="article-table">
          <thead><tr><th scope="col">Part of the setup</th><th scope="col">Nominal rate</th><th scope="col">Period</th></tr></thead>
          <tbody>
            <tr><th scope="row">Mac source display</th><td>100 Hz</td><td>10 ms</td></tr>
            <tr><th scope="row">Screen capture</th><td>30 fps</td><td>33.3 ms</td></tr>
            <tr><th scope="row">ThinkPad display</th><td>60 Hz</td><td>16.7 ms</td></tr>
          </tbody>
        </table></div>
        <p>The 100 Hz monitor does not make a 30 fps capture stream produce 100 frames per second. Likewise, a 60 Hz receiving display does not create sixty new streamed images when only thirty arrive.</p>
        <p>These rates also affect when a change gets noticed.</p>
        <p>In an ideal periodic 30 fps sampler, a change arriving just before the next sample waits almost no time. One arriving just after a sample waits almost 33.3 milliseconds. If changes are uniformly distributed across that interval, the average sampling wait is about 16.7 milliseconds.</p>
        <p>That is a model, not another measured stage I can casually add to the table. The actual capture and display schedules need not be independent, and the system has other delays too.</p>
        <p>But it explains why saving a few microseconds in packet parsing cannot eliminate every source of visible latency.</p>
        <p>It also explains why 60 fps is worth testing later. More frequent capture opportunities might help, provided encoding, transport, decoding, and presentation can keep up.</p>

        <h3>Fast frames and a fresh picture</h3>
        <p>The earlier freezes taught me to separate two questions:</p>
        <blockquote><p>How quickly can the system process a frame?</p></blockquote>
        <p>And:</p>
        <blockquote><p>How old is the picture the viewer is looking at right now?</p></blockquote>
        <p>A receiver can process its successful frames quickly and still spend seconds showing the previous image while waiting for recovery. During that pause, the image keeps getting older even though no new slow frame enters the timing report.</p>
        <p>That is why I need the software timings, loss and recovery logs, and physical observations together.</p>
        <p>The Minecraft demo adds something different again: a practical check that the result feels responsive enough to use. It is not a controlled latency benchmark, and it does not measure a remote-input path. The project is streaming the picture.</p>
        <p>At this checkpoint, I can say that the Mac-to-ThinkPad H.264 stream produced photographic examples around 50–60 ms of screen-to-screen difference, and that its measured receiver work typically took around 8–10 ms in the recorded batches.</p>
        <p>I cannot yet assign every remaining millisecond to a particular component.</p>
        <p>That is where the next work begins: separating what I know is expensive from what I only suspect is waiting.</p>
      </div>
    </section>
  )
}
