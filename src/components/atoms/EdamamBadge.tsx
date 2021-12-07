import Image from 'next/image'

export const EdamamBadge: React.FC = () => {
  return (
    <Image
      alt="edamam-badge"
      height={40}
      src="https://developer.edamam.com/images/transparent.png"
      width={200}
    />
  )
}
