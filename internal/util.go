package internal

import (
	"crypto/md5"
	"encoding/hex"
	"math/rand"

	"github.com/google/uuid"
)

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

//RandomHash
//
// returns a hash that contains 32 chars
func RandomHash() string {
	str := uuid.New().String() + randomString(10)
	md5Hash := md5Hash(str)
	return md5Hash
}

func randomString(length int) string {

	result := make([]byte, length)
	for i := 0; i < length; i++ {
		result[i] = chars[rand.Intn(len(chars))]
	}
	return string(result)
}

func md5Hash(input string) string {
	hash := md5.Sum([]byte(input))
	return hex.EncodeToString(hash[:])
}
