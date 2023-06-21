const removeDuplicateFromArray = (arr: any[]) => {
  return arr.filter((element, index) => arr.indexOf(element) === index)
}

export default removeDuplicateFromArray

