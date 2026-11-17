import type { ArticleBlock } from "@/types";

export const content: ArticleBlock[] = [
  {
    type: "p",
    text: "It has never been easier to add AI to an application. An API key, a few lines of code and a text box, and ten minutes later you have something that answers questions fluently. It's a genuinely impressive first step.",
  },
  {
    type: "p",
    text: "Then a real user arrives with a real question. They expect the assistant to remember what they said yesterday, to know something about their situation, to look things up rather than guess, and to get the numbers right. The model is the same as it was ten minutes ago. What's missing is everything around it.",
  },
  {
    type: "p",
    text: "That surrounding system is where the actual engineering lives, and it's what I want to unpack here.",
  },
  { type: "h2", text: "An API call is not an agent" },
  {
    type: "p",
    text: "A language model is, at its core, a function: text goes in, probable text comes out. On its own it has no memory of your users, no access to your database and no ability to do anything except produce more text.",
  },
  {
    type: "p",
    text: "It helps to think of what we build on top of it as a spectrum rather than as marketing tiers:",
  },
  {
    type: "list",
    items: [
      "**A chatbot** wraps the model in a conversation. It answers from what the model already knows.",
      "**An assistant** adds context: who the user is, what they've told you and the domain they're working in. It answers from what it knows about them.",
      "**An agentic workflow** lets the model decide what it needs to find out or do before it answers — calling tools, retrieving information, taking steps — inside a loop that the application controls.",
    ],
  },
  {
    type: "p",
    text: "\"Agent\" doesn't automatically mean better. Each step along the spectrum adds capability, but also cost, latency and new ways to fail. The right design is whichever one solves the problem with the least moving parts.",
  },
  { type: "h2", text: "Context is the product" },
  {
    type: "p",
    text: "The model knows nothing about your user unless you tell it. Most of the difference between a generic answer and a useful one comes from what the application puts into the request.",
  },
  {
    type: "p",
    text: "In SabiMate, a study-abroad assistant I'm building, students complete a profile during onboarding — their education and grades, language test results, preferred countries and budget range. That profile is assembled into the context for every reply. Without it, the assistant can only offer the kind of general advice people can already find anywhere; with it, it can respond to their situation.",
  },
  {
    type: "p",
    text: "Deciding what goes into context is a design problem in its own right. More isn't always better: every token costs money and time, irrelevant detail dilutes the useful parts, and personal data should only be sent when it's needed. Conversation history raises the same questions. Persisting conversations on the server gives continuity across sessions and devices, but you still have to choose how much history each request carries.",
  },
  { type: "h2", text: "Tools turn a model into a system" },
  {
    type: "p",
    text: "Tool calling is the mechanism that lets a model interact with the world. You describe a set of functions — a name, a description and a schema for their arguments — and include them with the request. When the model decides one would help, it doesn't run anything. It returns a request: \"call this tool with these arguments.\" Your code decides whether to honour it, runs it, and sends the result back so the model can continue.",
  },
  {
    type: "p",
    text: "That detail is the most important idea in agent engineering: **the model proposes, the application disposes.** Here's a simplified version of the code that sits between the two:",
  },
  {
    type: "code",
    language: "python",
    code: `from pydantic import BaseModel, ValidationError


class SearchArgs(BaseModel):
    query: str
    max_results: int = 5


TOOLS = {
    "search_programmes": (SearchArgs, search_programmes),
}


def run_tool_call(name: str, raw_args: str, user: User) -> dict:
    if name not in TOOLS:
        return {"error": f"Unknown tool: {name}"}

    schema, handler = TOOLS[name]
    try:
        args = schema.model_validate_json(raw_args)
    except ValidationError:
        return {"error": "Arguments did not match the tool's schema"}

    if not user.can_use(name):
        return {"error": "This action is not permitted"}

    return handler(args, user=user)`,
  },
  {
    type: "p",
    text: "Only tools on an explicit allow-list can run. The model's arguments are validated like any other untrusted input, because that's exactly what they are. Permissions are checked against the real user's identity, not against anything the model claims. And failures are returned as data, so the model can recover or explain the problem instead of the request crashing.",
  },
  { type: "h2", text: "Orchestration belongs on the backend" },
  {
    type: "p",
    text: "It's tempting to call the model straight from a mobile or web app. It's also a mistake for anything beyond a prototype. API keys can't safely live on a user's device. Prompts and tools need to change without shipping a new app release. Usage has to be limited per user, and you need a single place to see what happened when something goes wrong.",
  },
  {
    type: "p",
    text: "SabiMate's backend routes every model call through one provider adapter, so the rest of the code never talks to the model directly. Ordinary conversational replies and research are deliberately separate paths. Research has its own planner that decides what to search for, a step that reads and screens sources, and a check that every citation shown to the student comes from material that was actually retrieved. Each of those capabilities sits behind its own feature flag, and stays switched off until it has been properly tested.",
  },
  {
    type: "p",
    text: "That separation is what makes the system manageable. Research is slower and more expensive than a normal reply, so it gets its own quota, enforced in Redis, and its own failure handling. If research is unavailable, ordinary conversation still works.",
  },
  { type: "h2", text: "Never trust free-form output" },
  {
    type: "p",
    text: "Free-form text is fine when a person is going to read it. It's a liability when your code is going to act on it. If the application needs to extract a budget from a message, don't parse prose with a regular expression. Ask the model for structured output that matches a schema, then validate it:",
  },
  {
    type: "code",
    language: "python",
    code: `class Budget(BaseModel):
    amount: float
    currency: str  # ISO 4217 code, e.g. "GBP"


def parse_budget(model_output: str) -> Budget | None:
    try:
        return Budget.model_validate_json(model_output)
    except ValidationError:
        return None  # ask again, or ask the user to clarify`,
  },
  {
    type: "p",
    text: "The same thinking applies to anything the model presents as fact. A model can produce a convincing-looking link to a page that doesn't exist. Validating citations against what was really retrieved turns \"the model says so\" into something you can stand behind.",
  },
  { type: "h2", text: "Let deterministic code do deterministic work" },
  {
    type: "p",
    text: "Language models are probabilistic. Arithmetic, permissions, business rules and state transitions should not be.",
  },
  {
    type: "p",
    text: "FinAssist, an AI financial assistant I'm building, is designed around that split. Its currency converter runs on the backend with explicit inputs. When a user taps \"Ask FinAssist\" on a result, the app passes that result into the existing conversation as structured context — which tool ran, the inputs, and the output the backend produced. The assistant's job is to explain those figures and answer follow-up questions, not to calculate its own. If the AI and the calculator ever disagreed, the user would have no way to know which to believe, so the design makes sure they never compete.",
  },
  {
    type: "p",
    text: "A useful rule of thumb: let code handle anything with a single correct answer, and let the model handle interpretation, explanation and language.",
  },
  { type: "h2", text: "The unglamorous parts: cost, latency, failure and visibility" },
  {
    type: "p",
    text: "Every model call costs money and takes seconds, and that shapes the architecture. Streaming responses makes waiting feel shorter; SabiMate streams replies to the app as they're generated. Routing simpler tasks, such as planning a search, to a smaller and faster model tier keeps both cost and latency down. Per-user rate limits and quotas protect you from runaway usage, and they should fail safely when the system enforcing them is unavailable.",
  },
  {
    type: "p",
    text: "Models time out, return malformed output and occasionally refuse. Retries need limits, and every failure path needs a response the user can understand. You also need visibility: which prompt version ran, which tools were called, how long each step took and how many tokens it used — logged carefully, because conversations often contain personal information.",
  },
  {
    type: "p",
    text: "Testing matters as much as anywhere else. Replacing the model and search providers with fakes in automated tests lets you verify orchestration, validation and failure handling deterministically, without paying for a single real request.",
  },
  { type: "h2", text: "Start from the problem, not the trend" },
  {
    type: "p",
    text: "The best question to ask before building an AI feature isn't \"how do I add AI?\" It's \"what is hard for this user, and does understanding language actually help?\" Then ask the one most teams skip: what happens when the model is wrong? If there's no good answer to that last question, the feature isn't ready, no matter how impressive the demo looks.",
  },
  {
    type: "p",
    text: "Getting a model to respond is the easy part, and it gets easier every year. The real engineering challenge is building a system that uses AI reliably, safely and for a clear purpose — one with the right context, tools it's allowed to use, validation for everything it produces, and a firm line between what the AI decides and what the application guarantees.",
  },
];
