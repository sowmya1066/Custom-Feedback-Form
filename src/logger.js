try {
  const docRef = await db.collection("forms").add(formData);
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
