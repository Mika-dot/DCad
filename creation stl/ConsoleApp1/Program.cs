using System.IO;
using IxMilia.Stl;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            StlFile stlFile = new StlFile();
            stlFile.SolidName = "my-solid";

            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 0, 0), new StlVertex(0, 100, 0), new StlVertex(100, 0, 0)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(100, 0, 0), new StlVertex(0, 100, 0), new StlVertex(100, 100, 0)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 0, 100), new StlVertex(100, 0, 100), new StlVertex(0, 100, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(100, 0, 100), new StlVertex(0, 100, 100), new StlVertex(100, 100, 100)));

            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 0, 0), new StlVertex(100, 0, 0), new StlVertex(0, 0, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 0, 100), new StlVertex(100, 0, 0), new StlVertex(100, 0, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 100, 0), new StlVertex(100, 100, 0), new StlVertex(0, 100, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 100, 100), new StlVertex(100, 100, 0), new StlVertex(100, 100, 100)));

            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 0, 0), new StlVertex(0, 100, 0), new StlVertex(0, 0, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(0, 0, 100), new StlVertex(0, 100, 0), new StlVertex(0, 100, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(100, 0, 0), new StlVertex(100, 100, 0), new StlVertex(100, 0, 100)));
            stlFile.Triangles.Add(new StlTriangle(new StlNormal(1, 0, 0), new StlVertex(100, 0, 100), new StlVertex(100, 100, 0), new StlVertex(100, 100, 100)));

            using (FileStream fs = new FileStream(@"C:\Users\сервер\Downloads\1.stl", FileMode.Open))
            {
                stlFile.Save(fs);
            }
        }
    }
}
