import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {

  const {data, isLoading, error} = trpc.useQuery(['users.get-all'])

  if(isLoading) return (<p>loading...</p>)

  if(error) return (<div>{JSON.stringify(error)}</div>)

  return (
    <p>{JSON.stringify(data)}</p>
  )
}

export default Home
