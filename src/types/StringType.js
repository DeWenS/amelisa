import Char from './Char'

class StringType {
  constructor (chars = []) {
    this.chars = chars
  }

  get () {
    return this.chars
      .filter((char) => !char.removed)
      .map((char) => char.value)
      .join('')
  }

  insert (positionId, charId, value) {
    let index = 0
    if (positionId) {
      index = this.getIndexByPositionId(positionId)
      if (index === -1) return
      index++
    }
    let char = new Char(charId, value)
    this.chars.splice(index, 0, char)
  }

  remove (positionId) {
    let index = this.getIndexByPositionId(positionId)
    if (index === -1) return
    let char = this.chars[index]
    char.removed = true
  }

  getIndexByPositionId (positionId) {
    return this.chars.findIndex((char) => char.charId === positionId)
  }

  getInsertPositionIdByIndex (index) {
    let char = this.chars.filter((char) => !char.removed)[index - 1]
    if (char) return char.charId
  }

  getRemovePositionIdByIndex (index) {
    let char = this.chars.filter((char) => !char.removed)[index]
    if (char) return char.charId
  }

  getStringSetValue () {
    return this.chars
      .filter((char) => !char.removed)
      .map((char) => [char.charId, char.value])
  }

  setStringSetValue (setValue) {
    this.chars = setValue.map(([charId, value]) => new Char(charId, value))
  }

  setValue (values, generateCharId) {
    let chars = []

    for (let value of values) {
      let charId = generateCharId()
      let char = new Char(charId, value)
      chars.push(char)
    }

    this.chars = chars
  }
}

export default StringType