import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers:[
        GitHubProvider({
            clientId:'405c465794e05c383ba8',
            clientSecret:'7ecb083171e51861e9faac34c1a2f0f2e4aadf53'
        }),
        GoogleProvider({
            clientId:'149864965763-4gjhsnp4g0qk1oj9mrdq41s5mmdev7qn.apps.googleusercontent.com',
            clientSecret:'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'
        })
    ]
})