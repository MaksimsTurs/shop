import { useEffect, useState } from 'react'

const useFetch = <T>(
	url: string,
  defValue: any,
	loadingState: boolean = true,
	deps?: any[] | any,
	body?: any,
) => {
	const [stateData, setData] = useState<T>(defValue)
	const [isLoading, setLoading] = useState<boolean>(loadingState)
	const [fetchError, setFetchError] = useState<string>('')

	useEffect(() => {
		const fetcher = async () => {
			try {
				if (body) {
					const response: Response = await fetch(url, {
						body: JSON.stringify({ body }),
					})

					const data = await response.json()
					setData(data)
				} else {
          const response: Response = await fetch(url)
					const data = await response.json()

					setData(data)
				}
			} catch (error) {
				const isTypeError: boolean = String(error).includes('TypeError')
				const isURLUndefined: boolean = url === undefined ? true : false

				if (isTypeError) {
					setFetchError(`Failed to fetch: ${url}`)
				} else if (isURLUndefined) {
					setFetchError('URL cann not undefined!')
				}
			}

			setLoading(false)
		}

		fetcher()
	}, [Array.isArray(deps) ? deps.map(e => e) : deps])

	return { stateData, isLoading, fetchError }
}

export default useFetch
