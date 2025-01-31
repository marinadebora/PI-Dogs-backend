const { Dog } = require('../../dataBase');

module.exports = async (req, res) =>
{
  const { id } = req.params;

  const deletedDog = await Dog.deleteOne({ _id: id })

  if (!deletedDog) {
    return res.status(404).json({ message: "Dog not found in the database." });
  }

  res.status(200).json({ message: "Dog deleted successfully.", deletedDog });
}
/*  MACHETE
Comparación de métodos
1️⃣ findByIdAndDelete(id) no recibe objeto

✅ Borra un documento por su _id.
✅ Retorna el documento eliminado.
⚠️ Si el documento no existe, retorna null.
2️⃣ findOneAndDelete({ _id: id })

✅ Permite buscar con filtros más flexibles.
✅ Retorna el documento eliminado.
⚠️ Si el documento no existe, retorna null.
3️⃣ deleteOne({ _id: id })

✅ Borra un solo documento que coincida con el filtro.
❌ No retorna el documento eliminado, solo un objeto con { deletedCount: 1 } si se eliminó o { deletedCount: 0 } si no encontró coincidencias. */