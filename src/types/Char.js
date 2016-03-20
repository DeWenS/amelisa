class Char {
  constructor (charId, value, previousId, nextId) {
    this.charId = charId
    this.value = value
    this.removed = false
    this.previousId = previousId
    this.nextId = nextId
  }
}

export default Char
