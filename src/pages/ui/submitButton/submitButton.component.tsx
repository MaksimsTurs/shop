import style from './submitButton.module.scss'

import { FC } from 'react'

interface ComponentsProps {
  text: string
}

const SubmitButton: FC<ComponentsProps> = ({ text }) => {
  return(
    <button className={style.submit_button} type='submit'>{text}</button>
    )
}

export default SubmitButton