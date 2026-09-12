const cayleyContestUrl = 'https://cemc.uwaterloo.ca/sites/default/files/documents/2024/2021CayleyContest.html'

const contests = [
  { name: 'Cayley Contest (2021)', url: cayleyContestUrl },
  { name: 'Fermat Contest (2022)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2022/2022FermatContest.html' },
  { name: 'Hypatia Contest (2022)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2022/2022HypatiaContest.html' },
  { name: 'Euclid Contest (2023)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2023/2023EuclidContest.html' },
  { name: 'Canadian Team Mathematics Contest (2023)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2023/2023CTMCProblems.html' },
  { name: 'Canadian Senior Mathematics Contest (2023)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2023/2023CSMC.html' },
  { name: 'Canadian Computing Competition Junior (2022)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2025/2022CCCJrProblemSet.html' },
  { name: 'Canadian Computing Competition Senior (2023)', url: 'https://cemc.uwaterloo.ca/sites/default/files/documents/2023/2023CCCSrProblemSet.html' },
  { name: 'Sir Isaac Newton Contest practice problems', url: 'https://uwaterloo.ca/centre-advanced-science-education/science-contests/sir-isaac-newton-exam/practice-problems' },
  { name: 'Avogadro Contest (2011 sample paper)', url: 'https://uwaterloo.ca/centre-advanced-science-education/sites/default/files/uploads/documents/avogadro-exam-2011.pdf' },
]

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
        back to Canada so I could qualify to study at a Canadian university.
        I had always liked math and was good at it, although I didn&apos;t practice much; I mostly paid attention in
        class and did the homework. When I came back to Canada, everything changed. I had to write essays in a
        language I had not spoken fluently in seven years, alongside other stressors in my life at the time.
      </p>

      <p>
        When I started high school, I was lonely. Although I found my classes very easy, I had not yet developed
        a sense of comfort. It&apos;s incredible how much a change in language can trip you up, even in the easiest
        courses. One semester later, I met the teacher I would have in every grade of high school, across
        different courses. He was my Grade 9 Mathematics teacher. COVID started during that same semester.
        Before that, though, he saw something in me: curiosity and a fascination with unfamiliar problems. On a random snow day, when
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
        repetitive. I was stuck with open-ended problems that required me to use whatever was already in my
        toolset. I liked the creativity of it and the fact that the solutions were not always straightforward or
        obvious. Sometimes, I would rethink or rediscover ideas that turned out to be established techniques.
        I found that extremely mentally stimulating. Through these math competitions, I also formed long-lasting
        relationships in high school.
      </p>

      <p>
        Math became more than a course I enjoyed. I realized it was probably the only subject that was
        universally the same. The numbers, notation, and logic did not change depending on where you came from.
        As a high school student who had recently moved back to Canada, that felt comforting. It gave me a
        familiar place to start while I was still figuring everything else out.
      </p>

      <p>
        I didn&apos;t stop there. For the rest of high school, I wrote Fermat, Hypatia, Euclid, the Canadian Senior
        Mathematics Contest, and the Canadian Team Mathematics Contest. I also wrote the chemistry Avogadro
        Contest, the physics Sir Isaac Newton Contest twice, and the Canadian Computing Competition, or CCC for
        short. I earned a distinction in the Sir Isaac Newton Contest. I was also <a href="https://thelogic.co/news/waterloo-university-coding-competition-ai-cheating/">interviewed by The Logic about the CCC</a>.
      </p>

      <p>
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

      <section>
        <h2>Contests I Wrote</h2>
        <p>
          The Sir Isaac Newton practice problems were literally a nothing burger compared with the real thing;
          the actual questions were wayyy harder. The contest also had May the 4th jokes on it. I have some
          questions if anyone wants them, so just email me lol.
        </p>
        <p>
          There was not a public Avogadro paper from my year, but the linked 2011 paper is the same kind of
          thing.
        </p>
        <ul>
          {contests.map((contest) => (
            <li key={contest.url}>
              <a href={contest.url}>{contest.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
