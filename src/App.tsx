import { css } from '@emotion/react'
import { useState } from 'react'
import Pagination from './lib/Pagination'

function App() {
    const [page, setPage] = useState(0)

    const handlePage = (page: number) => setPage(page)

    return (
        <div css={wrapperCss}>
            <Pagination totalPage={100} page={page} handlePage={handlePage} />
        </div>
    )
}

const wrapperCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
`

export default App
