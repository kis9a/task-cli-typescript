export {run} from '@oclif/command'

// class qiiu extends command {
//   static description = 'upload image to qiita'

//   static flags = {
//     version: flags.version({char: 'v'}),
//     help: flags.help({char: 'h'}),
//     username: flags.string({char: 'u', description: 'qiita username', required: true}),
//     password: flags.string({char: 'p', description: 'qiita password', required: true}),
//     backupcode: flags.string({
//       char: 'c',
//       description: 'qiita backup code. this required if you 2 factor authentication enabled',
//     }),
//     verbose: flags.boolean({description: 'output verbose messages on internal operations'})
//   }

//   static args = [{name: 'imagepath'}]

//   async run() {
//     const {args, flags} = this.parse(qiiu)
//     const imageurl: string = await upload(args.imagepath, {
//       username: flags.username,
//       password: flags.password,
//       backupcode: flags.backupcode,
//       verbose: flags.verbose,
//     })
//     this.log(imageurl)
//   }
// }

// export = qiiu
