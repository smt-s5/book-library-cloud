# Menggunakan Node.js versi LTS yang stabil
FROM node:18-alpine

# Menentukan working directory di dalam kontainer
WORKDIR /usr/src/app

# Menyalin file package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi aplikasi
RUN npm install

# Menyalin seluruh source code backend
COPY . .

# Membuka port 3000
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]