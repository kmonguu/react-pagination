import { useMemo, useState } from 'react'
import { css } from '@emotion/react'

interface PaginationProps {
    totalPage: number
    page: number
    limit?: number
    handlePage: (page: number) => void
}

function Pagination({ totalPage, page, limit = 5, handlePage }: PaginationProps) {
    const [currentPageGroup, setCurrentPageGroup] = useState(0)
    const pageGroups = useMemo(() => generatePageGroups({ limit, totalPage }), [limit, totalPage])

    const handleMoveFirst = () => {
        handlePage(0)
        setCurrentPageGroup(0)
    }

    const handlePrev = () => {
        const prevPage = page - 1
        handlePage(prevPage)

        if (!!(page % limit)) return
        setCurrentPageGroup((prev) => prev - 1)
    }

    const handleNext = () => {
        const nextPage = page + 1
        handlePage(nextPage)

        if (!!(nextPage % limit)) return
        setCurrentPageGroup((prev) => prev + 1)
    }

    const handleMoveLast = () => {
        handlePage(totalPage - 1)
        setCurrentPageGroup(pageGroups.length - 1)
    }

    const isFirstPage = page === 0
    const isLastPage = page === totalPage - 1
    const prevClassName = isFirstPage ? 'disabled' : undefined
    const nextClassName = isLastPage ? 'disabled' : undefined

    return (
        <div css={wrapperCss}>
            <button css={arrowButtonCss} type="button" onClick={handleMoveFirst} className={prevClassName}>
                <Icon name="DoubleArrowLeft" />
            </button>
            <button css={arrowButtonCss} type="button" onClick={handlePrev} className={prevClassName}>
                <Icon name="ArrowLeft" />
            </button>
            {pageGroups[currentPageGroup].map((pageNumber) => (
                <button
                    css={pageButtonCss}
                    type="button"
                    className={page === pageNumber ? 'active' : undefined}
                    onClick={() => handlePage(pageNumber)}
                >
                    <span css={pageCss}>{pageNumber + 1}</span>
                </button>
            ))}
            <button css={arrowButtonCss} type="button" onClick={handleNext} className={nextClassName}>
                <Icon name="ArrowRight" />
            </button>
            <button css={arrowButtonCss} type="button" onClick={handleMoveLast} className={nextClassName}>
                <Icon name="DoubleArrowRight" />
            </button>
        </div>
    )
}

type GeneratePageGroupsParams = { limit: number; totalPage: number }
type GeneratePageGroups = (params: GeneratePageGroupsParams) => number[][]

const generatePageGroups: GeneratePageGroups = ({ limit, totalPage }) => {
    const pageGroups = []
    const totalPageGroup = Math.ceil(totalPage / limit)
    for (let pageGroup = 1; pageGroup <= totalPageGroup; pageGroup++) {
        const tmp = []
        const start = (pageGroup - 1) * limit
        const end = Math.min(start + limit, totalPage)
        for (let page = start; page < end; page++) {
            tmp.push(page)
        }
        pageGroups.push(tmp)
    }

    return pageGroups
}

const wrapperCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 10px 0;

    .disabled {
        pointer-events: none;
        cursor: default;

        svg > path {
            fill: ${theme.color.grayColor.grey30};
        }
    }
`

const arrowButtonCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const pageButtonCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    cursor: pointer;

    &.active {
        span {
            background-color: ${theme.color.grayColor.grey20};
            border-radius: 50%;
        }
    }

    :hover {
        span {
            background: ${theme.color.grayColor.grey10};
            border-radius: 50%;
        }
    }
`

const pageCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
`

export default Pagination
