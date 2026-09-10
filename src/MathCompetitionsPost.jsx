const cayleyContestUrl = 'https://cemc.uwaterloo.ca/sites/default/files/documents/2024/2021CayleyContest.html'

export default function MathCompetitionsPost() {
  return (
    <article className='learning-container' style={{ maxWidth: '720px', textAlign: 'left' }}>
      <p style={{ color: '#a5a5ff', fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
        WRITING / DRAFT
      </p>
      <h1>On Math Competitions</h1>

      <p>After many years abroad, the foreign became home, and I forgot what I once used to call home.</p>

      <p>
        It&apos;s interesting to have your world switch around, yet still find comfort in the things that stay the
        same. After many years living in Colombia, I had become used to my friends, the food, and the nature
        around my town. By the time I was about to start high school, my parents had decided that I should go
        back to Canada so I could qualify to study at a Canadian university, which was already my intention.
        I had always liked math and was good at it, although I didn&apos;t practise much; I mostly paid attention in
        class and did the homework. When I came back to Canada, everything changed. I had to write essays in a
        language I had not spoken fluently in seven years, alongside other stressors in my life at the time.
      </p>

      <p>
        When I started high school, I was lonely. Although I found my classes very easy, I had not yet developed
        a sense of comfort. It&apos;s incredible how much a change in language can trip you up, even in the easiest
        courses. One semester later, I met the teacher I would have in every grade of high school, across
        different courses. He was my Grade 9 Mathematics teacher, and COVID started during that same semester.
        Before that, though,
        he saw something in me: curiosity and a fascination with unfamiliar problems. On a random snow day, when
        most people stayed home, I went to school (at the time, I didn&apos;t know there was a website that said
        whether classes were cancelled lol). Since he didn&apos;t have anything to teach, the few of us who showed up
        either went to the gym or solved University of Waterloo problems. It sounded intriguing, so I stayed and
        worked on one. I found it very interesting.
      </p>

      <p>
        Later, once COVID restrictions lifted, I decided to sign up for one of the competitions. At the time, I
        was nerfed: my glasses had broken days earlier, so I had to work very slowly. Still, I did much better
        than I expected and got every question I answered right. Years later, I learned that this was not as
        surprising as it felt at the time, because the real questions are 20–25. <a href={cayleyContestUrl}>Here&apos;s the one I did.</a>
      </p>

      <p>
        As I kept solving them, I found a new kind of fun in math. The questions were no longer boring and
        repetitive; I was stuck with open-ended problems that required me to use whatever was already in my
        toolset. I liked the creativity of it and the fact that the solutions were not always straightforward or
        obvious. Sometimes, I would rethink or rediscover ideas that turned out to be established techniques.
        I found that extremely mentally stimulating. Through these math competitions, I also formed long-lasting
        relationships in high school. Math became more than a course I enjoyed: it was a common language and a
        way for me, and many other newcomers, to integrate into the school.
      </p>

      <p>
        I didn&apos;t stop there. I went on to write the math competitions for the rest of high school: Fermat,
        Hypatia, Euclid, the Canadian Senior Mathematics Contest, and the Canadian Team Mathematics Contest. On
        top of that, I wrote the chemistry Avogadro Contest and the physics Sir Isaac Newton Contest twice,
        earning a distinction in the latter. I also wrote the Canadian Computing Competition, or CCC for short.
        I was also <a href="https://thelogic.co/news/waterloo-university-coding-competition-ai-cheating/">interviewed by The Logic about the CCC</a>.
        I thought these competitions were great ways to find joy in math, and I may have spread that propaganda
        around to my peers. But the point I am trying to make is that math competitions are not just about your
        placement or score. The creativity is what I found most rewarding. I think the University of Waterloo
        does a great job with these contests, and I wish more universities ran things like them. It&apos;s always fun
        to solve problems.
      </p>

      <p>
        Looking back, I think math competitions gave me more than difficult problems to solve. They gave me a
        place to be curious, people to spend time with, and a shared language when so much else around me still
        felt unfamiliar. They re-established my love for math and helped shape the direction I wanted to dedicate
        my career to: computer science.
      </p>
    </article>
  )
}
