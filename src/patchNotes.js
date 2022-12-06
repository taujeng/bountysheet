export default function patchNotes() {
  const data = {
    0 : {
      date: "November 25, 2022",
      notes: ["Bounty Sheet officially available at: www.bountysheet.com"]
    },
    1 : {
      date: "November 28, 2022",
      notes: ["Added a navigation bar to the top, with a total of 4 buttons. So far, we have FAQ, Patch Notes, Stats, and Info."]
    },
    2: {
      date: "December 1, 2022",
      notes: ["Fixed the stopwatch/timer so that it kept track of time correctly even if BountySheet is not an active tab.",
      "Added a label for the stopwatch/timer.",
      "Disabled the timer's start button when there's no more time."]
    },
    3: {
      date: "December 6, 2022",
      notes: ["Updated the stats modal to include the average and total bounty/time spent.", "Added a daily bounty/time counter to the top right."]
    }
  }
  return data;
}