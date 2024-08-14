'use client'
import RemoveIcon from '@/components/basket/icons/remove.icon'
import { CategoryProps } from '@/components/home/categories/category.types'
import PlusIcon from '@/components/product/icons/plus.icon'
import {
  ProductCurrencyDto,
  ProductCurrencyForm,
  ProductImageDto,
  ProductImageForm,
  ProductInfoDto,
  ProductInfoForm,
} from '@/components/product/product.types'
import AdminGuardContainer from '@/containers/admin-guard.container'
import { useRouter } from '@/i18n.config'
import fetcher from '@/store/fetcher'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function NewProduct() {
  const t = useTranslations()
  const [images, setImages] = useState<ProductImageForm[]>([{ id: Math.random(), src: '', altTag: '' }])
  const router = useRouter()

  const [pricing] = useState<ProductCurrencyForm[]>([
    { id: Math.random(), currency: 'tl', price: '' },
    { id: Math.random(), currency: 'dollar', price: '' },
    { id: Math.random(), currency: 'euro', price: '' },
  ])

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories-selection'],
    queryFn: async () => {
      return await fetcher<CategoryProps[]>('/category', {
        method: 'GET',
      })
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (form: {
      categoryId: number
      images: ProductImageDto[]
      pricing: ProductCurrencyDto[]
      info: ProductInfoDto[]
    }) => {
      return await fetcher<{ message: string; slug: string }>(`/product/new-product`, {
        method: 'POST',
        body: form,
      })
    },
    onSuccess: (data) => {
      toast(data.message, { position: 'top-right' })
      router.push(`/product/${data.slug}`)
    },
    onError: () => {
      toast(t('common.error'), { position: 'top-right' })
    },
  })

  const [info] = useState<ProductInfoForm[]>([
    {
      id: Math.random(),
      language: 'tr',
      name: '',
      slug: '',
      description: '',
    },
    {
      id: Math.random(),
      language: 'en',
      name: '',
      slug: '',
      description: '',
    },
  ])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const images: ProductImageDto[] = []
    const pricing: ProductCurrencyDto[] = []
    const info: ProductInfoDto[] = []

    document.querySelectorAll('.image-item').forEach((x: any) => {
      const src = x.querySelector("[name='src']")?.value
      const altTag = x.querySelector("[name='alt']")?.value
      images.push({ src, altTag })
    })

    document.querySelectorAll('.price-item').forEach((x: any) => {
      const input = x.querySelector("[name='price']")
      const currency = input.dataset.currency
      const price = +input.value
      pricing.push({ currency, price })
    })

    document.querySelectorAll('.info-item').forEach((x: any) => {
      const name = x.querySelector("[name='name']")?.value
      const slug = x.querySelector("[name='slug']")?.value
      const description = x.querySelector("[name='description']")?.value
      info.push({ name, slug, description, language: x.dataset.language })
    })

    const categoryId = document.querySelector("[name='category'") as any

    mutate({ categoryId: Number(categoryId.value), images, pricing, info })
  }

  return (
    <AdminGuardContainer>
      <form onSubmit={handleSubmit} className="mt-2 flex column">
        {!categoriesLoading ? (
          <label className="flex column">
            {t('product.categoryTitle')}
            <select className="p-half m-h30" name="category">
              {categories?.map((category) => (
                <option value={category.category.id} key={category.category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p>{t('product.categoriesLoading')}</p>
        )}

        <fieldset className="p-half flex column images">
          <legend className="p-half">{t('product.imagesTitle')}</legend>
          <h1>ONLY UNSPLASH IMAGES</h1>
          <p>Example Images: </p>
          <p className="select-all">
            <b>
              https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
            </b>
          </p>
          <p className="select-all">
            <b>
              https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
            </b>
          </p>
          {images.map((image, index) => (
            <div className="flex column image-item" key={image.id}>
              <label className="flex column">
                Image Src
                <input required name="src" placeholder={`Src ${index + 1}`} className="p-half" type="text" />
              </label>
              <label className="flex column">
                Image Alt Tag
                <input required name="alt" placeholder={`Alt ${index + 1}`} className="p-half" type="text" />
              </label>
              {index !== 0 && (
                <button
                  onClick={() => {
                    setImages((prev) => {
                      const img = prev.filter((x) => x.id !== image.id)
                      return img
                    })
                  }}
                  type="button"
                  className="p-half align-self-start flex wrap align-items-center"
                >
                  <RemoveIcon />
                  {t('product.remove')}
                </button>
              )}
              <hr />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setImages((prev) => [...prev, { id: Math.random(), src: '', altTag: '' }])}
            className="p-half align-self-start flex wrap align-items-center"
          >
            <PlusIcon />
            {t('product.newImageButton')}
          </button>
        </fieldset>

        <fieldset className="p-half flex column pricing">
          <legend className="p-half">{t('product.pricing')}</legend>
          {pricing.map((price) => {
            return (
              <label key={price.id} className="flex column price-item">
                <input
                  required
                  type="number"
                  data-currency={price.currency}
                  name="price"
                  placeholder={t('product.priceIn', { price: price.currency }).toUpperCase()}
                  className="p-half"
                />
                <hr />
              </label>
            )
          })}
        </fieldset>

        <fieldset className="p-half flex column info">
          <legend className="p-half">{t('product.info')}</legend>
          <div className="flex column">
            {info.map((i) => {
              return (
                <label key={i.id} className="flex column info-item" data-language={i.language}>
                  <h3>{t('product.infoIn', { language: i.language })} </h3>
                  <input type="text" placeholder="Name" required name="name" className="p-half" />
                  <input type="text" placeholder="Slug" required name="slug" className="p-half" />
                  <textarea
                    className="p-half"
                    required
                    placeholder="description"
                    name="description"
                  ></textarea>
                </label>
              )
            })}
          </div>
        </fieldset>

        <button type="submit" className="p-half" disabled={isPending}>
          {!isPending ? <span>{t('comments.submit')}</span> : <p>{t('product.wait')}</p>}
        </button>
      </form>
    </AdminGuardContainer>
  )
}
