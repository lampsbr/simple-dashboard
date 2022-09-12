import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar, NextUIProvider, Text } from '@nextui-org/react';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Navbar variant="sticky">
        <Navbar.Toggle aria-label="toggle navigation" />
        <Navbar.Brand>
          <Link href='/' ><a>
            <Text b color="inherit" hideIn="xs">
              Simple Dashboard (comparison site)
            </Text>
            </a></Link>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.CollapseItem key={'comparisons'}><Link href="/comparisons"><a>Comparisons</a></Link></Navbar.CollapseItem>
          <Navbar.CollapseItem key={'about'}>Contact</Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
