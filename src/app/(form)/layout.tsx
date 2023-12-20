/**
 * フォーム類のレイアウト
 */
import { Footer } from '@/components/parts'
import { FormHeader } from './_components'

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FormHeader />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}

export default FormLayout
