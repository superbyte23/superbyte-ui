import { useApp } from '../theme/AppContext'

export default function ToastHost() {
  const { toasts } = useApp()
  return (
    <>
      {toasts.map(t => (
        <div key={t.id} className={'toast-custom ' + t.type}>
          <i
            className={
              'hgi-stroke ' +
              (t.type === 'success' ? 'hgi-checkmark-circle-01' : 'hgi-cancel-circle') +
              ' ' +
              t.type
            }
          ></i>
          <span>{t.msg}</span>
        </div>
      ))}
    </>
  )
}
