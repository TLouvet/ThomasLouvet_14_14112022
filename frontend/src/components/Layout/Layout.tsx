import { Header } from "./Header"
import { StyledMain } from "./Layout.styles"

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <StyledMain>
        {children}
      </StyledMain>
    </>
  )
}