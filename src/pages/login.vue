<template>
    <div>
        <h1>Login</h1>
        <div>
            <div class="mt-2">
                <button @click="loginGoogle">Google</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            store: useAuthStore()
        }
    },
    methods: {
        loginGoogle() {
            signWithGoogle()
                .finally(() => {
                    const user = getUser()
                    if (user == null)
                        return console.error("error")
                    this.store.setUser(user)
                    console.log("succesfull login")
                    return this.$router.push("/user")
                })
        },
    }
}
</script>

