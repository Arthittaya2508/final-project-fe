interface DropDownItem {
  key: string
  label: string
  icon: JSX.Element
  onClick?: () => void
}

export interface MenuDropdown {
  section?: string
  items: DropDownItem[]
}

export interface User {
  document_code: string
  names: [
    {
      lang: string
      text: string
    },
  ]
  package: string
  package_remaining_days: number
  is_expire: boolean
  package_enddate: Date // package_enddate
  total_candidate_quota: number
  total_candidate_use: number
  remaining_candidate_quota: number
  is_exceed_candidate_quota: boolean
  created_at: Date
  creator_name: string
  creator_email: string
  latest_login_date: Date
  contact_person_name: string
  contact_person_phone_number: string
  contact_person_email: string
}

export interface ToastProps {
  content: JSX.Element | string
}

export interface LoginFormValues {
  username: string
  password: string
  search: string
}

export interface GeneralData {
  document_code: string
  organization_th: string
  organization_en: string
  organization_type: string
  organization_size: string
  industry: string
  tax_id: string
  street: string
  sub_district: string
  district: string
  province: string
  postal_code: string
  phone_number: string
  website: string
  email: string
  contact_name: string
  contact_phone_number: string
  contact_job_title: string
  contact_email: string
}

export interface Hr {
  id: number
  firstname: string
  lastname: string
  nickname: string
  email: string
  phone: string
  employeeId: string
  jobTitle: string
  jobLevel: string
  department: string
}
