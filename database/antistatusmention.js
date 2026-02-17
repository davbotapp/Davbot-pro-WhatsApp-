/**
 * Anti Status Mention
 * Fichier placeholder pour éviter les erreurs require
 * Tu peux ajouter la logique plus tard si besoin
 */

class AntiStatusMention {
  constructor() {
    this.enabled = false;
  }

  isEnabled() {
    return this.enabled;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}

module.exports = new AntiStatusMention();
