export class Phone {
  public name: string;
  public price: number;
  public desc: string;
  public image: string;
  public brand: string;
  public ram: string;
  public processor: string;
  public displayResolution: string;
  public storage: string;
  public camera: string;
  public os: string;
  public displaySize: string;
  public gpu: string;
  public dimesions: string;
  public weight: string;
  public batery: string;

  constructor(name, price, desc, image, brand, ram, processor, displaySize, displayResolution, gpu, storage, camera, os,
              dimensions, weight, batery) {
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.image = image;
    this.brand = brand;
    this.ram = ram;
    this.processor = processor;
    this.displaySize = displaySize;
    this.displayResolution = displayResolution;
    this.gpu = gpu;
    this.storage = storage;
    this.camera = camera;
    this.os = os;
    this.dimesions = dimensions;
    this.weight = weight;
    this.batery = batery;
  }
}
