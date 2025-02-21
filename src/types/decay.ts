export interface Material {
  name: string;
  maxHp: number;
  decayTime: number; // in hours
}

export interface DecayInfo {
  timeLeft: string;
  decayDateTime: string;
}
