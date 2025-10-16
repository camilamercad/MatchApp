import { ProyectoController } from "../../proyecto.controller";
import { it, jest, beforeEach, describe, expect } from '@jest/globals';

describe('ProyectoController', () => {
  let controller: ProyectoController;
  let req: any;
  let res: any;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      GetAll: jest.fn(),
      GetById: jest.fn(),
      Add: jest.fn(),
      DeleteById: jest.fn(),
      UpdateById: jest.fn(),
    };
    controller = new ProyectoController(mockRepository);
    req = { params: {}, body: {} };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all projects', async () => {
    const mockProjects = [{ id: 1, name: 'Test Project' }];
    mockRepository.GetAll.mockResolvedValue(mockProjects);
        await controller.GetAll(req, res);
    expect(res.json).toHaveBeenCalledWith(mockProjects);
    });
  });

  describe('getById', () => {
    it('should return a project by ID', async () => {
        const mockProject = { Id: 1, name: 'Test Project' };
        mockRepository.GetById.mockResolvedValue(mockProject);
        req.params.Id = 1;
        await controller.GetById(req, res);
        expect(res.json).toHaveBeenCalledWith(mockProject);
    });
    it('should return 404 if project not found', async () => {
        mockRepository.GetById.mockResolvedValue(null);
        req.params.Id = '999';
        await controller.GetById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
  });
    
  describe('add', () => {
    it('should add a new project', async () => {
        req.body = {
        Titulo: 'Test Project',
        Descripcion: 'Desc corta',
        IdUsuario: 1,
        };

        mockRepository.Add.mockResolvedValue(undefined);

        await controller.Add(req, res);

        expect(mockRepository.Add).toHaveBeenCalledWith(
        expect.objectContaining({
            Titulo: 'Test Project',
            Descripcion: 'Desc corta',
            IdUsuario: 1,
        })
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete a project by ID', async () => {
      req.params.Id = '1';
      await controller.DeleteById(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe('updateById', () => {
    it('should update a project by ID', async () => {
        req.params = { Id: 1 };

        req.body = { 
        Titulo: 'Updated Project', 
        Descripcion: 'Nueva descripción',
        };

        mockRepository.UpdateById.mockResolvedValue(undefined);

        await controller.UpdateById(req, res);

        expect(mockRepository.UpdateById).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
            Titulo: 'Updated Project',
            Descripcion: 'Nueva descripción',
        })
        );
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
  });
});