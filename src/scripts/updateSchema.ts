import { prisma } from "@/utils/prisma";
import slugify from "slugify";

const addSlugs = async () => {
  const posts = await prisma.post.findMany();

  for (const post of posts) {
    const slug = slugify(post.title, {
      lower: true,
      strict: true,
      replacement: "-",
    });
    await prisma.post.update({
      where: { id: post.id },
      data: { slug },
    });
    console.log(`Added slug as ${slug} in Post id of ${post.id}`);
  }
  console.log("Slug added successfully!!");
};

addSlugs()
  .catch((err) => console.error(`Error occured. ${err}`))
  .finally(() => prisma.$disconnect());

// this file is to update NULL values and for scalability in the database.
// and to fix the datas that has a UNIQUE constraint in a column in a database.
