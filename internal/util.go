package internal

import (
	"crypto/sha256"
	"encoding/hex"
	"math/rand"

	"github.com/google/uuid"
)

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

// RandomHash16Chars
//
// returns a hash that contains 32 chars
func RandomHash16Chars() string {
	str := uuid.New().String() + randomString(10)
	md5Hash := sha256Hash(str)
	return md5Hash
}

func randomString(length int) string {

	result := make([]byte, length)
	for i := 0; i < length; i++ {
		result[i] = chars[rand.Intn(len(chars))]
	}
	return string(result)
}

func sha256Hash(input string) string {
	hash := sha256.Sum256([]byte(input))
	return hex.EncodeToString(hash[:])
}
