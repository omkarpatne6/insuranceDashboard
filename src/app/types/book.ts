export interface Books {
    title: string
    isbn: string
    price: number | string,
    publishedDate: PublishedDate
    thumbnailUrl: string
    shortDescription?: string
    longDescription?: string
    status: string
    authors: Array<string>
    categories: Array<string>
    quantity?: number
}

export interface PublishedDate {
    $date: string
}