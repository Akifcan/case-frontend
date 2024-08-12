'use client'
import GreetingHeader from '@/components/profile/greeting.header'
import GuardContainer from '@/containers/guard.container'
import UpdateForm from '@/components/profile/update.form'

export default function Profile() {
  return (
    <GuardContainer>
      <div className="flex column mt-2">
        <GreetingHeader />
        <UpdateForm />
      </div>
    </GuardContainer>
  )
}
