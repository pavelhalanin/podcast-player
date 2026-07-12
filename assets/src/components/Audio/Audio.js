class AudioHelper {
  static init() {
    const AUDRIO_ROOT = document.getElementById("root_audio");
    if (!AUDRIO_ROOT) {
      alert("HTML node not found: #root_audio");
      return;
    }

    AUDRIO_ROOT.innerHTML = this.render();

    const AUDIO = this.getAudio();
    AUDIO.setAttribute("src", localStorage.getItem("audio") || "");

    const THIS = this;

    AUDIO.addEventListener("timeupdate", () => {
      const INFO = THIS.getVideoInfo(AUDIO);

      const AUDIO_TIME = document.getElementById("audio__time");

      if (!AUDIO_TIME) {
        throw new Error(`Не найден узел: #audio__time`);
      }

      const AUDIO_RANGE = document.getElementById("audio__range");

      if (!AUDIO_RANGE) {
        throw new Error(`Не найден узел: #audio__range`);
      }

      AUDIO_RANGE.value = (INFO.currentTime / INFO.duration) * 100;

      AUDIO_TIME.innerHTML = `${INFO.currentTimeFormatted} / ${INFO.durationFormatted}`;
    });
  }

  static getAudio() {
    const NODE = document.getElementById("audio");
    if (!NODE) {
      alert("HTML node not found: #audio");
      return;
    }

    return NODE;
  }

  static setUrl(url) {
    const AUDIO = this.getAudio();
    AUDIO.setAttribute("src", url);
    localStorage.setItem("audio", url);
  }

  static togglePlay() {
    const AUDIO = this.getAudio();

    const BUTTON = document.getElementById("audio__play_stop_button");

    if (!BUTTON) {
      throw new Error(`HTML node not found: #audio__play_stop_button`);
    }

    if (AUDIO.paused) {
      AUDIO.play();
      BUTTON.innerHTML = "⏸";
    } else {
      AUDIO.pause();
      BUTTON.innerHTML = "▶";
    }
  }

  static mute() {
    const AUDIO = this.getAudio();

    const MUTE_BUTTON = document.getElementById("audio__mute_button");

    if (!MUTE_BUTTON) {
      throw new Error(`Не найден узел: #audio__mute_button`);
    }

    const MUTE_VOLUME_RANGE = document.getElementById(
      "audio__mute_volume_range",
    );

    if (!MUTE_VOLUME_RANGE) {
      throw new Error(`Не найден узел: #audio__mute_volume_range`);
    }

    if (!AUDIO) {
      return null;
    }

    AUDIO.muted = !AUDIO.muted;
    MUTE_BUTTON.innerHTML = AUDIO.muted ? "🔇" : "🔊";

    if (!AUDIO.muted) {
      this.setAudioVolume(MUTE_VOLUME_RANGE.getAttribute("data-prev-value"));
    } else {
      this.setAudioVolume(0);
    }
  }

  static setAudioVolume(volume) {
    const AUDIO = this.getAudio();

    const MUTE_BUTTON = document.getElementById("audio__mute_button");

    if (!MUTE_BUTTON) {
      throw new Error(`Не найден узел: #audio__mute_button`);
    }

    const MUTE_VOLUME_RANGE = document.getElementById(
      "audio__mute_volume_range",
    );

    if (!MUTE_VOLUME_RANGE) {
      throw new Error(`Не найден узел: #audio__mute_volume_range`);
    }

    const NORMALIZED_VOLUME = Math.max(0, Math.min(1, volume));

    AUDIO.muted = NORMALIZED_VOLUME == 0;
    MUTE_BUTTON.innerHTML = AUDIO.muted ? "🔇" : "🔊";

    AUDIO.volume = NORMALIZED_VOLUME;

    MUTE_VOLUME_RANGE.value = NORMALIZED_VOLUME;
  }

  static savePrevValue(element) {
    if (element.value == 0) {
      return;
    }

    element.setAttribute("data-prev-value", element.value);
  }

  static formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  static getVideoInfo(videoElement) {
    const AUDIO = this.getAudio();

    if (!AUDIO) {
      return null;
    }

    return {
      duration: AUDIO.duration,
      currentTime: AUDIO.currentTime,
      durationFormatted: this.formatTime(AUDIO.duration),
      currentTimeFormatted: this.formatTime(AUDIO.currentTime),
      progress: (AUDIO.currentTime / AUDIO.duration) * 100 || 0,
    };
  }

  static setVideoToPercent(percent) {
    const AUDIO = this.getAudio();

    const duration = AUDIO.duration;
    if (!duration || isNaN(duration)) {
      return;
    }

    AUDIO.currentTime = duration * percent;
  }

  static setVideoRange() {
    const AUDIO_RANGE = document.getElementById("audio__range");

    if (!AUDIO_RANGE) {
      throw new Error(`Не найден узел: #audio__range`);
    }

    this.setVideoToPercent(AUDIO_RANGE.value / 100);
  }

  static speedUpdate(speed) {
    const AUDIO = this.getAudio();

    if (speed < 0 || speed > 3) {
      return;
    }

    AUDIO.playbackRate = speed;

    const SPEED_RANGE = document.getElementById("audio__speed_range");
    if (!SPEED_RANGE) {
      throw new Error(`HTML node not found: #audio__speed_range`);
    }

    SPEED_RANGE.value = speed;

    const SPEED_VALUE = document.getElementById("audio__speed_value");
    if (!SPEED_VALUE) {
      throw new Error(`HTML node not found: #audio__speed_value`);
    }

    SPEED_VALUE.innerHTML = Number(speed).toFixed(2);
  }

  static render() {
    return `
      <video id="audio" src="" style="display: none;"></video>
      <div class="audio__wrapper">
        <div class="audio__content">
          <div class="audio__range">
            <input
              id="audio__range"
              type="range"
              value="0"
              min="0"
              max="100"
              step="0.01"
              oninput="AudioHelper.setVideoRange()"
            >
          </div>
          <div class="audio__controls">
            <button id="audio__play_stop_button" onclick="AudioHelper.togglePlay()">
              ▶
            </button>
            <div class="audio__mute_volume">
              <button id="audio__mute_button" onclick="AudioHelper.mute()">🔊</button>
              <input
                id="audio__mute_volume_range"
                type="range"
                min="0"
                max="1"
                step="0.01"
                onchange="AudioHelper.savePrevValue(this)"
                data-prev-value="1"
                oninput="AudioHelper.setAudioVolume(event.target.value)"
              >
            </div>
            <div id="audio__time">00:00 / 00:00</div>
            <div class="audio__speed">
                🚀
                <input
                  id="audio__speed_range"
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.01"
                  oninput="AudioHelper.speedUpdate(event.target.value)"
                >
                <span id="audio__speed_value">1.00</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
