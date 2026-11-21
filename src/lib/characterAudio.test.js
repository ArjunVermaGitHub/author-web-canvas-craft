import { describe, expect, test } from 'bun:test';
import { CHARACTER_AUDIO_TIMING, characterBedVolume, createCharacterAudioPlayer } from './characterAudio';

describe('character audio schedule', () => {
  test('voice follows the bed after 600ms at full volume', () => {
    expect(CHARACTER_AUDIO_TIMING.voiceDelayMs).toBe(600);
    expect(CHARACTER_AUDIO_TIMING.voiceVolume).toBe(1);
    expect(CHARACTER_AUDIO_TIMING.bedVolume).toBe(0.25);
  });
  test('bed fades linearly to silence in 1200ms', () => {
    expect(CHARACTER_AUDIO_TIMING.fadeMs).toBe(1200);
    expect(characterBedVolume(0)).toBe(0.25);
    expect(characterBedVolume(600)).toBe(0.125);
    expect(characterBedVolume(1200)).toBe(0);
    expect(characterBedVolume(2000)).toBe(0);
    expect(characterBedVolume(-100)).toBe(0.25);
  });
  test('construction does not autoplay; stop cancels delayed voice and resets both clips', async () => {
    const audios = [];
    const player = createCharacterAudioPlayer('voice', 'bed', () => {}, url => {
      const audio = { url, currentTime: 0, playCount: 0, paused: true, play() { this.playCount++; this.paused = false; return Promise.resolve(); }, pause() { this.paused = true; } };
      audios.push(audio); return audio;
    });
    expect(audios.map(a => a.playCount)).toEqual([0, 0]);
    player.play();
    expect(audios.map(a => a.playCount)).toEqual([1, 1]);
    player.stop();
    await new Promise(resolve => setTimeout(resolve, 650));
    expect(audios.map(a => a.playCount)).toEqual([1, 1]);
    expect(audios.every(a => a.paused && a.currentTime === 0)).toBe(true);
  });
  test('blocked playback stops everything and offers a manual retry', async () => {
    let blocked = 0;
    const audios = [];
    const player = createCharacterAudioPlayer('voice', 'bed', () => blocked++, () => {
      const audio = { currentTime: 3, paused: true, play() { return Promise.reject(new Error('blocked')); }, pause() { this.paused = true; } };
      audios.push(audio); return audio;
    });
    player.play();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(blocked).toBe(1);
    expect(audios.every(a => a.paused && a.currentTime === 0)).toBe(true);
  });
  test('sound toggle mutes both clips', () => {
    const audios = [];
    const player = createCharacterAudioPlayer('voice', 'bed', () => {}, () => { const audio = { pause() {}, currentTime: 0 }; audios.push(audio); return audio; });
    player.setSound(false);
    expect(audios.map(a => a.muted)).toEqual([true, true]);
    player.setSound(true);
    expect(audios.map(a => a.muted)).toEqual([false, false]);
    player.stop();
  });
});