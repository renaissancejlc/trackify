// Assign meaning based on average energy and valence traits
  const assignMeaningBasedOnTraits = (energy: number, valence: number): string => {
    if (energy < 0.2 && valence < 0.2) {
      return "You're in a deep emotional winter—find light in solitude.";
    } else if (energy < 0.2 && valence > 0.8) {
      return "Stillness and joy coexist—you’ve found rare peace.";
    } else if (energy > 0.8 && valence < 0.2) {
      return "Intensity without joy—channel your fire, don’t let it consume you.";
    } else if (energy > 0.8 && valence > 0.8) {
      return "Joy and drive align—now is the time to act boldly.";
    } else if (energy > 0.6 && valence < 0.4) {
      return "High momentum, low joy—ask yourself what you're chasing.";
    } else if (energy < 0.4 && valence > 0.6) {
      return "A quiet happiness surrounds you—cherish the calm.";
    } else if (energy > 0.5 && valence > 0.5) {
      return "Balanced energy and optimism—your efforts are well-placed.";
    } else if (energy < 0.5 && valence < 0.5) {
      return "Something weighs you down—look inward to find the root.";
    } else if (valence < 0.3) {
      return "Melancholy lingers—honor your feelings but don’t dwell.";
    } else if (valence > 0.7) {
      return "Hope is strong—let it guide your next steps.";
    } else {
      return "You’re in flux—listen closely to what feels true.";
    }
  };