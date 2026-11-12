import type { ArticleBlock } from "@/types";

export const content: ArticleBlock[] = [
  {
    type: "p",
    text: "Flutter makes it remarkably quick to get something impressive on screen. Hot reload, a rich widget library and one codebase for Android and iOS mean that in an afternoon you can have a login screen, a dashboard and a few animated cards that look finished.",
  },
  {
    type: "p",
    text: "That's exactly the trap. The demo runs on your own phone, on good Wi-Fi, signed into a fresh account with perfect data. Real users don't live there. They open the app on a train with one bar of signal, after their session expired three days ago, on a device with a different Android version and a permission they denied the first time they were asked.",
  },
  {
    type: "p",
    text: "This article is about the gap between those two apps: the one that looks good in a screenshot, and the one people can actually depend on.",
  },
  { type: "h2", text: "The UI is what users see, not what they depend on" },
  {
    type: "p",
    text: "An interface is a promise. Every button says \"tap me and something sensible will happen.\" Behind that promise sits a request, a response, a failure mode, a retry and a piece of state that has to stay correct afterwards.",
  },
  {
    type: "p",
    text: "When an app freezes, shows yesterday's data or loses what someone just typed, users don't think \"state management bug.\" They think the app is unreliable, and they're right. Building the screen is the beginning of mobile development, not most of it.",
  },
  { type: "h2", text: "State is where most apps quietly go wrong" },
  {
    type: "p",
    text: "Most \"random\" bugs aren't random. They come from the same data living in several places at once: a field in a widget, a cached object, a global singleton. Two copies drift apart, and the screen shows whichever one it happened to read.",
  },
  {
    type: "p",
    text: "The fix is less about which package you choose and more about discipline: one source of truth for each piece of data, state that changes in one place, and UI that is a function of that state. Riverpod, Bloc or a plain `ChangeNotifier` can all do this. What matters is that the boundaries are deliberate.",
  },
  {
    type: "p",
    text: "A habit that pays off quickly is to model the states a screen can really be in, explicitly, instead of juggling flags like `isLoading` and `hasError` that can contradict each other:",
  },
  {
    type: "code",
    language: "dart",
    code: `sealed class ProfileState {
  const ProfileState();
}

class ProfileLoading extends ProfileState {
  const ProfileLoading();
}

class ProfileLoaded extends ProfileState {
  const ProfileLoaded(this.profile);
  final Profile profile;
}

class ProfileFailed extends ProfileState {
  const ProfileFailed(this.message);
  final String message;
}

Widget buildProfile(ProfileState state) => switch (state) {
      ProfileLoading() => const CircularProgressIndicator(),
      ProfileLoaded(:final profile) => ProfileCard(profile: profile),
      ProfileFailed(:final message) => ErrorView(message: message),
    };`,
  },
  {
    type: "p",
    text: "Because the class is `sealed`, the `switch` has to be exhaustive. Add a new state and the compiler points at every screen that doesn't handle it yet. The screen can't be loading and failed at the same time, because that combination simply doesn't exist. Riverpod's `AsyncValue` gives you the same shape for asynchronous data out of the box.",
  },
  { type: "h2", text: "The backend will not always say what you expect" },
  {
    type: "p",
    text: "In a demo, the API answers instantly with exactly the fields you designed for. In production, requests time out, tokens expire and come back as `401`, a deployment returns a `500` for a minute, a list arrives empty and a field you assumed was always present turns up `null`.",
  },
  {
    type: "p",
    text: "Treat every network call as something that can fail in several distinct ways, and decide in advance what the user sees for each. A generic \"Something went wrong\" for every case technically handles the error, but it leaves people stuck with no idea whether to retry, sign in again or give up.",
  },
  { type: "h3", text: "Parse at the boundary" },
  {
    type: "p",
    text: "Convert JSON into typed models in one place, and be strict there. If a value arrives in the wrong shape, you want to find out in the parsing layer, not three screens later when a widget renders an empty name:",
  },
  {
    type: "code",
    language: "dart",
    code: `class Device {
  const Device({required this.id, required this.name, this.lastSeen});

  final String id;
  final String name;
  final DateTime? lastSeen;

  factory Device.fromJson(Map<String, dynamic> json) {
    final id = json['id'];
    final name = json['name'];
    if (id is! String || name is! String) {
      throw const FormatException('Device payload is missing id or name');
    }
    final lastSeen = json['last_seen'];
    return Device(
      id: id,
      name: name,
      lastSeen: lastSeen is String ? DateTime.tryParse(lastSeen) : null,
    );
  }
}`,
  },
  {
    type: "p",
    text: "The model states clearly what's optional, and a malformed response fails loudly at the edge of the app instead of producing a half-empty screen. Loading and empty states deserve the same care: an empty list is a real state with its own message, not a blank space where data should be.",
  },
  { type: "h2", text: "Authentication is security and user experience at once" },
  {
    type: "p",
    text: "Sessions end, and they rarely end at a convenient moment. Store tokens in the platform's secure storage — the Keychain on iOS and Keystore-backed encryption on Android, which is what `flutter_secure_storage` wraps — rather than in plain preferences. Then design for expiry: refresh quietly when you can, and when you can't, send people back to sign in without throwing away what they were doing.",
  },
  {
    type: "p",
    text: "Just as important is deciding what the client shouldn't do at all. In Fihone, a mobile security app I'm building, authentication, device data and location handling all sit behind the backend API rather than in the app. The client presents and requests; the server decides. Anything security-sensitive that lives only on the device is something you've chosen to trust a device you don't control.",
  },
  { type: "h2", text: "Assume the connection will drop" },
  {
    type: "p",
    text: "Phones go into lifts, basements and areas with weak coverage, and people ration mobile data. An app that shows a blank screen whenever the network is slow feels broken, even when nothing on the server is wrong.",
  },
  {
    type: "p",
    text: "Offline-first design flips the usual order: the app reads from local storage, and the network keeps that storage in sync. Writes are recorded locally first and sent when a connection returns. Regiforte, an attendance app I'm building, was designed this way so that a presence scan never fails just because the phone has no signal.",
  },
  {
    type: "p",
    text: "The hard parts aren't the local database. They're the decisions around it: what happens when two changes conflict, what \"saved\" means to the user when the server hasn't confirmed it yet, and how to show that something is still waiting to sync. Not every app needs full offline support, but every app needs an answer to the question \"what happens when there's no connection?\"",
  },
  { type: "h2", text: "No two devices behave quite the same" },
  {
    type: "p",
    text: "Flutter gives you one codebase, not one platform. Permissions, background behaviour and battery management still differ between Android and iOS, and between versions of each. Location is a good example: both platforms let users grant approximate rather than precise location, and both treat background access very differently from foreground use.",
  },
  {
    type: "p",
    text: "On Fihone, getting a consistent, trustworthy location signal from both platforms without draining the battery has taken more iteration than any screen in the app. A few rules have held up: ask for a permission at the moment it's needed and explain why, handle \"denied\" and \"denied permanently\" as different states, and test on real devices — including an older, slower one.",
  },
  { type: "h2", text: "Architecture is what lets the app survive its second year" },
  {
    type: "p",
    text: "In the first version, putting everything inside widgets works. Then a second developer joins, the backend changes a field, or you need to add caching. Suddenly the screen that fetches data, transforms it and renders it is the hardest file in the project to touch.",
  },
  {
    type: "p",
    text: "Separating presentation, state, and data access — usually behind a repository interface — means a screen doesn't care whether its data came from the network or the cache, and tests can swap in a fake. This isn't about ceremony; a to-do app doesn't need six layers. Introduce a boundary wherever you expect change, and nowhere else.",
  },
  { type: "h2", text: "Shipping is the start of the work" },
  {
    type: "p",
    text: "Unit tests for parsing and business logic, widget tests for the loading, error and empty states, and a handful of integration tests for the flows that must never break will catch more real problems than chasing a coverage number. After release, you need visibility too: crash reports and meaningful logs, because you can't fix what you can't see.",
  },
  {
    type: "p",
    text: "Remember that people don't update immediately. The backend has to keep serving older versions of the app for a while, which means API changes need to be additive and deliberate rather than casual.",
  },
  { type: "h2", text: "Build for the person, not the screenshot" },
  {
    type: "p",
    text: "None of this shows up in a screenshot. Nobody shares a picture of a well-handled expired session or a scan that quietly queued itself until the signal came back. But that's precisely the work people notice when it's missing.",
  },
  {
    type: "p",
    text: "A successful mobile app isn't defined by how impressive its interface looks. It's defined by how reliably it works when someone is depending on it — on a bad connection, on an old phone, on the day it matters to them. Build for that person, and the screenshots will take care of themselves.",
  },
];
