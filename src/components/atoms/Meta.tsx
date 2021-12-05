import Head from 'next/head'

type Props = {
  title: string
}

export const Meta: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title && `${title} | `}Magic Pantry</title>
      <meta name="description" content="Suggest menus from ingredients" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
