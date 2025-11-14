declare module '@mailchimp/mailchimp_marketing' {
  interface Config {
    apiKey: string
    server: string
  }

  interface MergeFields {
    FNAME?: string
    LNAME?: string
    [key: string]: any
  }

  interface ListMember {
    email_address: string
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending'
    merge_fields?: MergeFields
  }

  interface Lists {
    addListMember(listId: string, body: ListMember): Promise<any>
  }

  interface Mailchimp {
    setConfig(config: Config): void
    lists: Lists
  }

  const mailchimp: Mailchimp
  export default mailchimp
}

