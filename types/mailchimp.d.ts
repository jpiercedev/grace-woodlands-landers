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

  interface Tag {
    name: string
    status: 'active' | 'inactive'
  }

  interface TagsBody {
    tags: Tag[]
  }

  interface Lists {
    addListMember(listId: string, body: ListMember): Promise<any>
    updateListMemberTags(listId: string, subscriberHash: string, body: TagsBody): Promise<any>
  }

  interface Mailchimp {
    setConfig(config: Config): void
    lists: Lists
  }

  const mailchimp: Mailchimp
  export default mailchimp
}

