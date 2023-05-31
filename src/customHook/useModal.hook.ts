import { RefObject } from 'react'

const useModal = (ref: RefObject<any>, event: MouseEvent, state: boolean): boolean => {

	if (event.target === ref.current && state) {
    return false
  } else if(ref.current && ref.current.contains(event.target)) {
    return true
  } else {
    return false
  }
}

export default useModal