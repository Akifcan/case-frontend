import Image from 'next/image'
import styles from './product-detail.module.css'
import { useEffect, useRef, useState } from 'react'

export default function ProductImagesList() {
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)

  const resize = () => {
    const el = childRef.current
    if (!el) {
      return
    }
    el.style.display = 'none'
    const width = parentRef.current?.clientWidth

    if (!width) {
      return
    }
    el.style.width = `${width}px`
    el.style.display = 'flex'
  }

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div ref={parentRef} className={'flex column flex-1 overflow-hidden'}>
      <h1>Product Name</h1>
      <div className={styles['product-thumbnail']}>
        <Image
          fill
          sizes={'100%'}
          src={
            'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
          }
          alt={'firstImage.altTag'}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div ref={childRef} className={styles['product-image-list']}>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={[styles['product-image-card']].join(' ')}>
          <Image
            fill
            sizes={'100%'}
            src={
              'https://images.unsplash.com/photo-1659423269449-361b455d3cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            }
            alt={'firstImage.altTag'}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  )
}
