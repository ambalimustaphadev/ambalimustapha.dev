import type { ArticleBlock } from "@/types";

export const content: ArticleBlock[] = [
  {
    type: "p",
    text: "Every developer knows the moment. After an hour of errors, the code finally runs. The screen loads, the request succeeds, the test goes green. It's a good feeling, and it should be.",
  },
  {
    type: "p",
    text: "But \"it runs\" answers a much narrower question than it seems to. It tells you the code works on this machine, with this data, in this order, today. It says very little about whether the problem is solved, whether the next person can change it safely, or whether it will still work when a thousand people use it at once.",
  },
  {
    type: "p",
    text: "The distance between those two things — code that runs and software that works — is where programming turns into engineering.",
  },
  { type: "h2", text: "Understand the problem before you choose the tools" },
  {
    type: "p",
    text: "It's tempting to start a project by choosing the stack: the framework everyone's talking about, the database you used last time. But tools are answers, and you can't pick a good answer before you understand the question.",
  },
  {
    type: "p",
    text: "Who will use this, and where? What happens if it's down for an hour? Does it need to work without an internet connection? Who else touches the data? An app that must keep working offline needs a fundamentally different architecture from one that can assume a connection. Discovering that requirement after the first release is far more expensive than asking about it on the first day.",
  },
  { type: "h2", text: "Five situations that separate coding from engineering" },
  {
    type: "p",
    text: "The difference rarely shows up while writing a new feature. It shows up when something goes wrong. Here are five situations most developers meet sooner or later, and the thinking that gets you through each one.",
  },
  { type: "h3", text: "1. It works locally, but fails after deployment" },
  {
    type: "p",
    text: "The instinct is to start changing things until it works again. The better question is: what is different between the two environments? The answer is usually one of a short list — a missing environment variable, a database migration that never ran, a different language or library version, a time zone. Even file names can bite: the default macOS file system ignores the difference between `Avatar.png` and `avatar.png`, and a Linux server does not.",
  },
  {
    type: "p",
    text: "The lasting fix is to make environments boringly similar. Containers, pinned dependency versions, and migrations that run automatically as part of every deployment turn \"works on my machine\" into a much rarer sentence.",
  },
  { type: "h3", text: "2. The frontend expects something the backend doesn't send" },
  {
    type: "p",
    text: "The backend returns this:",
  },
  {
    type: "code",
    language: "json",
    code: `{ "full_name": "Ada Lovelace", "avatar_url": null }`,
  },
  {
    type: "p",
    text: "And the app was written to expect this:",
  },
  {
    type: "code",
    language: "dart",
    code: `final name = json['fullName'] as String;    // the key is actually full_name
final avatar = json['avatarUrl'] as String; // and the value can be null`,
  },
  {
    type: "p",
    text: "Both sides \"work\" in isolation, and the feature still fails. The root problem isn't the typo; it's that the contract between frontend and backend only existed in two people's heads. Write it down: a schema or OpenAPI document, shared examples, or contract tests that fail when either side drifts. Then parse responses at a single boundary in the client, so a mismatch produces one clear error instead of a broken screen.",
  },
  { type: "h3", text: "3. A small change breaks something unrelated" },
  {
    type: "p",
    text: "You adjust how dates are formatted on one screen, and an export file on the other side of the app starts producing nonsense. Nothing is unrelated; the connection just wasn't visible. Usually it's a shared helper used in more places than anyone remembered, or shared state that two features both assumed they owned.",
  },
  {
    type: "p",
    text: "Before changing code, find out who depends on it. Searching for every caller takes minutes, and it's much cheaper than discovering the dependency in production. Tests are what make this safe over time: they turn \"I hope nothing else uses this\" into a fact you can check.",
  },
  { type: "h3", text: "4. Hours spent fixing symptoms" },
  {
    type: "p",
    text: "A value is unexpectedly `null`, so you add a null check. Then another one somewhere else. The crashes stop, but the data is still wrong, now silently. Every patch treats a symptom while the cause keeps producing new ones.",
  },
  {
    type: "p",
    text: "Debugging is a method, not a mood: reproduce the problem reliably, narrow down where it first goes wrong, form a hypothesis, and test it. Asking \"why is this null?\" once more than feels necessary is usually where the real fix is. Reading unfamiliar code carefully — rather than skimming it for the line to change — is part of that skill, and arguably the most underrated one in the profession.",
  },
  { type: "h3", text: "5. It works in the demo, but struggles with real use" },
  {
    type: "p",
    text: "The demo had ten records. Real use has ten thousand, the page loads every one of them, and each row triggers its own database query. Two people edit the same item at once. Someone submits the form twice. Nobody sees any of this until real users arrive.",
  },
  {
    type: "p",
    text: "Engineering means asking these questions early: what happens with a lot of data, with many people at the same time, with a slow connection or a repeated request? Pagination, sensible queries, idempotent operations and limits on what one user can do aren't premature optimisation. They're what separates a demo from a product.",
  },
  { type: "h2", text: "Architecture is a series of trade-offs" },
  {
    type: "p",
    text: "There's no best architecture, only architectures that fit a problem better or worse. Microservices, layers and design patterns all solve real problems, and they all cost something. A useful question is which decisions are easy to reverse and which aren't. Renaming an internal function is cheap. Changing a database schema with live data, or a public API that released apps depend on, is not.",
  },
  {
    type: "p",
    text: "Spend your care on the decisions that are hard to undo, keep everything else simple, and add structure when there's a real reason for it — not because a tutorial did.",
  },
  { type: "h2", text: "Technical debt is a loan, not a sin" },
  {
    type: "p",
    text: "Shortcuts aren't automatically wrong. Shipping something simple to learn whether it's needed can be the right call. The difference is whether the debt was taken deliberately, with a plan to repay it, or accidentally, without anyone noticing.",
  },
  {
    type: "p",
    text: "The best time to refactor is usually when you're about to change that code anyway and its structure is getting in the way. Improve what you touch, keep each change small and tested, and be very suspicious of the urge to rewrite everything from scratch.",
  },
  { type: "h2", text: "The requirements nobody writes down" },
  {
    type: "p",
    text: "Users rarely ask for security, tests, monitoring or a reliable deployment process, but they notice immediately when any of them is missing. Validate every input on the server, because the client can't be trusted. Hash passwords, keep secrets out of the repository and give each part of the system only the access it needs. Automate deployment so that releasing is routine rather than nerve-racking, and log enough that you can answer \"what happened?\" without guessing.",
  },
  {
    type: "p",
    text: "None of it is glamorous, and all of it is part of building software.",
  },
  { type: "h2", text: "AI tools make understanding more important, not less" },
  {
    type: "p",
    text: "AI coding assistants have changed how quickly code gets written. They're excellent at boilerplate, at explaining unfamiliar libraries and at suggesting a first draft. What they haven't changed is who is responsible for the result.",
  },
  {
    type: "p",
    text: "Generated code tends to look plausible, which is precisely what makes its mistakes easy to miss: a missing permission check, an unhandled error, a query that works on small data and collapses on large. If you can't explain why a piece of code is correct, you can't be confident that it is, wherever it came from. The developers who benefit most from these tools are the ones who read, test and question what they're given.",
  },
  { type: "h2", text: "From finishing tasks to owning outcomes" },
  {
    type: "p",
    text: "The deepest shift isn't technical. It's moving from \"my ticket is done\" to \"the problem is solved.\" It's asking how a feature will fail before it does, thinking about the person who'll maintain your code next year, and caring what happens after the merge.",
  },
  {
    type: "p",
    text: "Writing code is an essential skill, and it's worth getting good at. But understanding the problem, making sound decisions, managing complexity and taking responsibility for the finished product are what turn a programmer into a software engineer. The good news is that every one of those is learnable — usually one bug, one deployment and one hard-won lesson at a time.",
  },
];
