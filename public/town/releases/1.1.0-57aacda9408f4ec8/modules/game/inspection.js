/** Transient camera-only inspection; never persisted as experimental evidence. */
export class InspectionState {
    subject = null;
    previousPause = false;
    get active() { return this.subject !== null; }
    enter(subject) {
        if (this.active)
            return false;
        this.subject = subject;
        this.previousPause = subject.paused;
        subject.paused = true;
        return true;
    }
    /** Backgrounding must not cause an implicit resume when the view is later closed. */
    hold() { if (this.active)
        this.previousPause = true; }
    exit(current) {
        if (!this.subject)
            return false;
        if (current === this.subject)
            current.paused = this.previousPause;
        this.subject = null;
        return true;
    }
}