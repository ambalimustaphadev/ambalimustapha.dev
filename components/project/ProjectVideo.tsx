import type { CSSProperties } from "react";
import type { ProjectVideo as ProjectVideoData } from "@/types";

/**
 * A case-study screen recording. Nothing is downloaded until the visitor
 * presses play (preload="none", poster frame shown instead), it never
 * autoplays, and the browser's own controls handle playback, so it works the
 * same with a mouse, keyboard, touch or screen reader.
 */
export function ProjectVideo({ title, video }: { title: string; video: ProjectVideoData }) {
  return (
    <section className="ambali-project-video" aria-labelledby="project-video-title">
      <h2 className="mini-title" id="project-video-title">
        See {title} in action
      </h2>
      <div className="ambali-project-video__body">
        <div
          className="ambali-project-video__frame"
          // Never shown wider than the recording's own pixels.
          style={{ "--video-w": `${video.width}px` } as CSSProperties}
        >
          <video
            controls
            playsInline
            preload="none"
            poster={video.poster}
            width={video.width}
            height={video.height}
            aria-label={`${title} screen recording`}
            aria-describedby="project-video-description"
          >
            <source src={video.src} type="video/mp4" />
            Your browser can’t play this video. <a href={video.src}>Download the screen recording</a>.
          </video>
        </div>
        <div className="ambali-project-video__text">
          <p className="docs" id="project-video-description">
            {video.description}
          </p>
          <p className="ambali-project-video__meta">
            <i className="fa-regular fa-clock" aria-hidden="true" /> {video.durationSeconds}-second
            screen recording, no audio
          </p>
        </div>
      </div>
    </section>
  );
}
