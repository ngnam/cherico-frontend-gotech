function setImageHost(imgPath) {
  if (!imgPath) {
    return imgPath
  }
  return process.env.IMAGE_HOST + '/' + imgPath
}

export { setImageHost }
